const fs = require('fs');
const botContent = fs.readFileSync('bot.js', 'utf8');

const vpsMaps = `1234-by-Qua-xs._6359999414324.hbs
1.-Racing-Ground-xs._66d7c2a6a6359.hbs
Air_Hockey_v1_v2_By_Lioss_[xs.].hbs
American Space Carryball by Alf.hbs
AnimalChairs_v2_Whale_by_erefli_eref_[xs.].hbs
Ban_by_Meeelany_[xs.].hbs
Ban Random by Pagus.hbs
Big Multiballs Ring Survival from HaxMaps.hbs
BONK_17_Bubbles_by_kara_ayta_[17_players]_[xs.].hbs
BONK Arena by MC from HaxMaps.hbs
Bonk Game By Beru [16 players] from HaxMaps.hbs
Bonk Game By Beru from HaxMaps.hbs
Bonk-Movable-by-Namajunas-xs._618002e5bafc7.hbs
Bonk-Summer-by-Serefli-Seref-20-players-xs._61ae18e96d540.hbs
Bonk-Winter-by-Serefli-Seref-20-players-xs._61ae19074320f.hbs
B.T.L-by-Serefli-Seref-xs._61ae180ad2466.hbs
capture_the_vlag_by_valn_[xs.].hbs
chair.hbs
ChairMix by Vhagar.hbs
Charge-2-by-Qua-xs._630e6e67a8ef1.hbs
Collision team racing 9 by MC  from HaxMaps.hbs
Covid-19 Survival [Teams] by Galactic Boy.hbs
Covid2byNamajunasfromHaxMaps.hbs
Dodgeball by MC.hbs
Dodgeball v2 _ Leo.hbs
DOMINIC SURVIVOR 15 from HaxMaps.hbs
Endure Survival 2 by Namajunas from HaxMaps.hbs
Endure_Survival_(Bombs)_by_Alf_[xs.].hbs
Fitanic_by_erefli_eref_[xs.].hbs
FIT-IN-Bridge-by-Namajunas-xs._65542d907eefb.hbs
Fit_in_(Graveyard)_by_Galactic_Boy_[xs.].hbs
Fit-IN-HELL-by-NAMAJUNAS-xs._61e763463ad0b.hbs
FIT IN TREN by NAMAJUNAS (5 red - 5 blue) from HaxMaps.hbs
Fortunate or unfortunate Race HD Cech from HaxMaps.hbs
Futbol_callejero_a_las_pias.hbs
Galactic_Fit_by_Vhagar_&_Jordan_[xs.].hbs
Game Of Thrones from HaxMaps.hbs
Gol a Gol by SalgadoDoce goal from HaxMaps.hbs
Gymmix 6 by MC.hbs
Gymmix 6.5 from HaxMaps.hbs
gym_3_[xs.].hbs
Gym_4.5.1_by_erefli_eref_[xs.].hbs
GYM 4 from HaxMaps.hbs
Gym_5.3_Colors_by_erefli_eref_[xs.]_(1).hbs
Gym_5.3_Colors_by_erefli_eref_[xs.].hbs
Gym 8 _ by Alf.hbs
Gym 9 from HaxMaps.hbs
GYM from HaxMaps.hbs
HaxRoulette-xs._615f20134f789.hbs
Hrsz_&_Polis_(Cops_and_Robbers)_by_Namajunas_[xs.].hbs
Jump_by_Qua_[xs.].hbs
Jumping Arena by MC [20 players].hbs
Jumping-Survival-by-Serefli-Seref-xs._61ae1e1af196f.hbs
Kafa Topu by Vhagar.hbs
Kafa_Topu_Shadow_by_Tudor_[xs.].hbs
KOR-P.-CECH-Pinball-Roulette-xs._6534bd14f1879.hbs
Kuru Kafa Bonk by Namajunas from HaxMaps.hbs
LALALA from HaxMaps.hbs
Laser Race 20000 from HaxMaps.hbs
Lucky race 10000 from HaxMaps.hbs
Matrix_Fit_by_Vhagar_[xs.].hbs
Meadowlands Survival.hbs
Meteors Survival v3 from HaxMaps.hbs
mini_simulator_1v1_2v2_3v3_4v4_5v5_6v6_7v7_[xs.].hbs
Moving goal Classic  .hbs
MultiBalls Survival by Galactic Boy from HaxMaps.hbs
Musical-FIT-by-kara-aytac-14-players-xs._626361ab4d651.hbs
Namajunas_Race_2_[xs.].hbs
Namajunas Race (My Last Map) from HaxMaps.hbs
Parkurt Survival By Beru from HaxMaps.hbs
Parkurt_Survival_By_Beru_[xs.].hbs
Plum from HaxMaps.hbs
Pong_MIX_R_Kuma_[xs.].hbs
Race 02 by MC from HaxMaps.hbs
random roulette by Pagus.hbs
Reverse-Bonk-18-players-new-edit-by-Namajunas-xs._632e12b840347.hbs
Ring O Pong from HaxMaps.hbs
Run-by-Namajunas-xs._62566e3f2c271.hbs
Run-Luck-By-Beru-xs._6512efefb172b_(1).hbs
run-mini.hbs
RUN-Mini-Pekka-By-zer0ne-xs._628048143a738.hbs
RUN rebound 1 by pagus.hbs
RUN rebound 2 by pagus.hbs
salta Batman _Pagus.hbs
s_By_GLH.hbs
Shaolin_Soccer_[gargus]_V2_Edit_[xs.].hbs
Shooting Survival .hbs
snipers-and-prisoners-by-namajunas-xs._61583349768e3.hbs
SpaceBounce Power from HaxMaps.hbs
SpaceBounce race 10000 from HaxMaps.hbs
_Space Case by MC.hbs
SpaceMelee-2-by-Namajunas-xs._632a4a3ad876b.hbs
Space_Melee_by_Namajunas_[xs.].hbs
Space Vortex _Asdman.hbs
Spiral Match by Galactic Boy from HaxMaps.hbs
Spot Bonk by MC from HaxMaps.hbs
Square Alive by Alf.hbs
SquidGame_[1]_by_Vhagar_[xs.].hbs
SquidGame_[2]_by_Vhagar_[xs.].hbs
SquidGame-3-by-Vhagar-xs._616fe4c897965.hbs
SquidGame-4-by-Vhagar-xs._616fde0909fae.hbs
SquidGame_[5]_by_Vhagar_[xs.].hbs
Squid_Game_-_Tug_of_War_[xs.].hbs
Street_race_70000 from HaxMaps.hbs
Super gravedad x4 - !!zDk.hbs
Superman_Chair_v2_by_Namajunas_[xs.].hbs
Survival-From-Insect-by-FY-xs._64c62a1d6140d.hbs
Survival Room _ Leo.hbs
Survival_Square_Deluxe_by_R_[xs.].hbs
Survivor-VOL-17-Namajunas-xs._65bee97e78587.hbs
Swing-3-Cannons-by-kara-aytac-8-players-xs._62636226478f4.hbs
Swing Trambolin by Namajunas from HaxMaps.hbs
Tank-War-flag-version-by-namajunas-xs._63445a4ca17fe.hbs
Trambolin.hbs
TRIVIA_Wolfgang_fixed_by_R_[xs.].hbs
ULTRABALL.hbs
-_v1.0.hbs
War-Of-Conquest-by-Namajunas-xs._6556da2c05a07.hbs
Web_Survival_by_Namajunas_[xs.].hbs
Web_Survival_Version_2_by_Namajunas_[xs.].hbs
Wind-by-Namajunas-xs._6260f81615856.hbs
WWECross-Prototype.hbs
xd from HaxMaps.hbs
ZOMBIE-RUN-LaboratorioByEmaxM16Ofi-xs._67c8ecb1e06b7.hbs`.split('\n').map(s=>s.trim()).filter(Boolean);

const re = /path\.join\(__dirname,\s*'Mapas',\s*'([^']+)'\)/g;
let match;
const fixes = [];
while ((match = re.exec(botContent)) !== null) {
    const ref = match[1];
    if (vpsMaps.includes(ref)) continue;
    
    // Try to find matching VPS map
    const base = ref.replace(/[\[\]\(\)\.]/g, '').toLowerCase();
    let best = null;
    for (const vps of vpsMaps) {
        const vpsBase = vps.replace(/[\[\]\(\)\.]/g, '').toLowerCase();
        if (vpsBase === base) { best = vps; break; }
    }
    if (!best) {
        // Try fuzzy match - first 20 chars
        const prefix = ref.replace(/[\[\]\(\)\.\s]/g, '').substring(0, 20).toLowerCase();
        for (const vps of vpsMaps) {
            const vpsPrefix = vps.replace(/[\[\]\(\)\.\s]/g, '').substring(0, 20).toLowerCase();
            if (vpsPrefix === prefix || prefix.includes(vpsPrefix) || vpsPrefix.includes(prefix)) {
                best = vps; break;
            }
        }
    }
    fixes.push({ old: ref, new: best });
}

console.log('MISMATCHES TO FIX:');
fixes.forEach((f,i) => console.log((i+1) + ': OLD: ' + f.old + '\n   NEW: ' + f.new));

// Apply fixes
let updated = botContent;
for (const f of fixes) {
    if (f.new) {
        updated = updated.replace("'Mapas', '" + f.old + "'", "'Mapas', '" + f.new + "'");
    } else {
        console.log('WARNING: No match for: ' + f.old);
    }
}

fs.writeFileSync('bot.js', updated, 'utf8');
console.log('\nFixed ' + fixes.length + ' references');
