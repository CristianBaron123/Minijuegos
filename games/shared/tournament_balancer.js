// ============================================
// TOURNAMENT BALANCER — Centralized team balancing for goal-tournament minigames
// Injected into room-main.txt as a global before minigame modules
// ES5 only — runs in Puppeteer-injected browser context
// ============================================

var TournamentBalancer = (function() {
    'use strict';

    // ============================================
    // UTILITY: Fisher-Yates shuffle (mutates array in place)
    // ============================================
    function _shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }

    // ============================================
    // 1. validatePlayers(room, ids)
    //    Filters out disconnected player IDs
    // ============================================
    function validatePlayers(room, ids) {
        var validIds = [];
        var disconnectedIds = [];
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            if (room.getPlayer(id)) {
                validIds.push(id);
            } else {
                disconnectedIds.push(id);
            }
        }
        return {
            validIds: validIds,
            disconnectedIds: disconnectedIds
        };
    }

    // ============================================
    // 2. balanceRound(room, players, spectatorPool)
    //    CORE FUNCTION
    //    Single source of truth for impar handling.
    //    Called ONCE per decision point. Never multiple times.
    //
    //    INVARIANT: After this function:
    //      - activePlayers.length is EVEN and >= 2, OR
    //      - isTerminal === true
    // ============================================
    function balanceRound(room, players, spectatorPool) {
        var changes = [];
        var i, j, picked, moved;

        // --- PASO 0: Limpiar desconectados de ambos pools ---
        var activeResult = validatePlayers(room, players);
        var activePlayers = activeResult.validIds.slice();
        var specResult = validatePlayers(room, spectatorPool);
        var spectators = specResult.validIds.slice();

        for (i = 0; i < activeResult.disconnectedIds.length; i++) {
            changes.push('removed disconnected active ' + activeResult.disconnectedIds[i]);
        }
        for (i = 0; i < specResult.disconnectedIds.length; i++) {
            changes.push('removed disconnected spec ' + specResult.disconnectedIds[i]);
        }

        // --- PASO 1: Si NO hay activos, intentar traer de spectators ---
        if (activePlayers.length === 0 && spectators.length > 0) {
            picked = spectators.splice(Math.floor(Math.random() * spectators.length), 1)[0];
            activePlayers.push(picked);
            changes.push('brought ' + picked + ' from spec (all active disconnected)');
        }

        // --- PASO 2: Si hay 0 o 1 activos, resolver ---
        if (activePlayers.length === 0) {
            return {
                activePlayers: [],
                spectators: spectators,
                isTerminal: true,
                winnerId: null,
                changes: changes
            };
        }

        if (activePlayers.length === 1) {
            if (spectators.length > 0) {
                // Traer spectator para 1v1
                picked = spectators.splice(Math.floor(Math.random() * spectators.length), 1)[0];
                activePlayers.push(picked);
                changes.push('brought ' + picked + ' from spec (1 active)');
                // Ahora hay 2 — retornar para 1v1
                return {
                    activePlayers: activePlayers,
                    spectators: spectators,
                    isTerminal: false,
                    winnerId: null,
                    changes: changes
                };
            } else {
                // Solo 1 jugador, no hay spectators — GANADOR
                return {
                    activePlayers: activePlayers,
                    spectators: spectators,
                    isTerminal: true,
                    winnerId: activePlayers[0],
                    changes: changes
                };
            }
        }

        // --- PASO 3: Si hay exactamente 2 activos — 1v1 perfecto ---
        if (activePlayers.length === 2) {
            return {
                activePlayers: activePlayers,
                spectators: spectators,
                isTerminal: false,
                winnerId: null,
                changes: changes
            };
        }

        // --- PASO 4: Si count es IMPAR (>2), intentar traer spectator ---
        if ((activePlayers.length % 2) === 1) {
            if (spectators.length > 0) {
                picked = spectators.splice(Math.floor(Math.random() * spectators.length), 1)[0];
                activePlayers.push(picked);
                changes.push('brought ' + picked + ' from spec (impar fix)');
            } else {
                // No hay spectators — mover uno a spectator
                moved = activePlayers.splice(Math.floor(Math.random() * activePlayers.length), 1)[0];
                spectators.push(moved);
                changes.push('moved ' + moved + ' to spec (impar fix, no specs)');
            }
        }

        // --- PASO 5: Verificacion de seguridad (no deberia pasar, pero protege) ---
        if ((activePlayers.length % 2) === 1 && activePlayers.length > 2) {
            moved = activePlayers.splice(Math.floor(Math.random() * activePlayers.length), 1)[0];
            spectators.push(moved);
            changes.push('EMERGENCY moved ' + moved + ' to spec');
        }

        // --- PASO 6: Si despues de todo quedan < 2, terminal ---
        if (activePlayers.length < 2) {
            if (activePlayers.length === 1) {
                return {
                    activePlayers: activePlayers,
                    spectators: spectators,
                    isTerminal: true,
                    winnerId: activePlayers[0],
                    changes: changes
                };
            } else {
                return {
                    activePlayers: [],
                    spectators: spectators,
                    isTerminal: true,
                    winnerId: null,
                    changes: changes
                };
            }
        }

        // --- CASO NORMAL: par >= 2 ---
        return {
            activePlayers: activePlayers,
            spectators: spectators,
            isTerminal: false,
            winnerId: null,
            changes: changes
        };
    }

    // ============================================
    // 3. assignTeams(room, playerIds)
    //    Shuffle + split half to Team 1, half to Team 2
    //    SIDE EFFECT: calls room.setPlayerTeam()
    // ============================================
    function assignTeams(room, playerIds) {
        var ids = playerIds.slice();
        _shuffle(ids);
        var half = Math.floor(ids.length / 2);
        var team1 = [];
        var team2 = [];
        for (var i = 0; i < ids.length; i++) {
            var team = (i < half) ? 1 : 2;
            try {
                room.setPlayerTeam(ids[i], team);
            } catch (e) {}
            if (team === 1) {
                team1.push(ids[i]);
            } else {
                team2.push(ids[i]);
            }
        }
        return {
            team1: team1,
            team2: team2
        };
    }

    // ============================================
    // 4. moveNonParticipantsToSpectator(room, participantIds)
    //    Moves any player not in participantIds to team 0
    //    SIDE EFFECT: calls room.setPlayerTeam()
    // ============================================
    function moveNonParticipantsToSpectator(room, participantIds) {
        var allP = room.getPlayerList();
        for (var i = 0; i < allP.length; i++) {
            var p = allP[i];
            if (p.id === 0) continue;
            var found = false;
            for (var j = 0; j < participantIds.length; j++) {
                if (participantIds[j] === p.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                try {
                    room.setPlayerTeam(p.id, 0);
                } catch (e) {}
            }
        }
    }

    // ============================================
    // 5. processMatchResult(room, result, players, spectatorPool, options)
    //    Post-match flow: remove losers, handle winner mechanics, rebalance ONCE
    //    options = { keepHalfWinners: boolean }  (for earn_easily)
    // ============================================
    function processMatchResult(room, result, players, spectatorPool, options) {
        options = options || {};
        var i, idx;

        // Si no hay resultado valido, terminar
        if (!result || !result.winners || result.winners.length === 0) {
            return {
                activePlayers: [],
                spectators: spectatorPool.slice(),
                isTerminal: true,
                winnerId: null
            };
        }

        // --- 1. Mover perdedores a spectators ---
        var newSpectators = spectatorPool.slice();
        for (i = 0; i < result.losers.length; i++) {
            var loserId = result.losers[i];
            newSpectators.push(loserId);
            try {
                room.setPlayerTeam(loserId, 0);
            } catch (e) {}
        }

        // --- 2. Ganadores son los nuevos activos ---
        var newActive = result.winners.slice();

        // --- 3. Si keepHalfWinners (earn_easily): mitad de ganadores — spectator ---
        if (options.keepHalfWinners && newActive.length >= 2) {
            _shuffle(newActive);
            var half = Math.floor(newActive.length / 2);
            var movedWinners = newActive.splice(half); // mitad que se mueve
            for (i = 0; i < movedWinners.length; i++) {
                newSpectators.push(movedWinners[i]);
                try {
                    room.setPlayerTeam(movedWinners[i], 0);
                } catch (e) {}
            }
            // newActive ahora tiene solo los que quedan
        }

        // --- 4. Llamar balanceRound UNA SOLA VEZ ---
        var balanceResult = balanceRound(room, newActive, newSpectators);

        // --- 5. Aplicar team=0 a los que quedaron en spectator ---
        for (i = 0; i < balanceResult.spectators.length; i++) {
            try {
                room.setPlayerTeam(balanceResult.spectators[i], 0);
            } catch (e) {}
        }

        return {
            activePlayers: balanceResult.activePlayers,
            spectators: balanceResult.spectators,
            isTerminal: balanceResult.isTerminal,
            winnerId: balanceResult.winnerId
        };
    }

    // ============================================
    // 6. handleDisconnect(room, playerId, players, spectatorPool)
    //    Remove player from both pools, rebalance ONCE
    // ============================================
    function handleDisconnect(room, playerId, players, spectatorPool) {
        // Remover de players
        var newPlayers = [];
        for (var i = 0; i < players.length; i++) {
            if (players[i] !== playerId) {
                newPlayers.push(players[i]);
            }
        }

        // Remover de spectatorPool
        var newSpectators = [];
        for (i = 0; i < spectatorPool.length; i++) {
            if (spectatorPool[i] !== playerId) {
                newSpectators.push(spectatorPool[i]);
            }
        }

        // Rebalancear
        return balanceRound(room, newPlayers, newSpectators);
    }

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        validatePlayers: validatePlayers,
        balanceRound: balanceRound,
        assignTeams: assignTeams,
        moveNonParticipantsToSpectator: moveNonParticipantsToSpectator,
        processMatchResult: processMatchResult,
        handleDisconnect: handleDisconnect
    };
})();
