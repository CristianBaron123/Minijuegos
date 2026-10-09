// Funciones de base de datos que el bot (room-main.txt) llama desde el navegador con window.__algo().
// Las usa el panel (panel.js). Se centralizan acá para que el panel y bot.js no se desincronicen:
// cuando faltaba una en el panel, el comando correspondiente decía "no disponible" (ej. la tienda).
// tests/expose_check.js verifica que no falte ninguna.
module.exports = function makeBridge(db) {
    const vpnCache = new Map();
    return {
        // cobro atómico (tienda, apuestas, transferencias, clanes)
        __dbSpendBalance: async (auth, name, amount) => db.spendBalance(auth, name, amount),
        __dbIncStat: async (auth, name, field, amount) => { await db.incStat(auth, name, field, amount); },
        __dbSetField: async (auth, name, field, value) => db.setPlayerField(auth, name, field, value),
        // VIP, admins y advertencias
        __dbSetVip: async (auth, name, status) => { await db.setVip(auth, name, status); },
        __dbGetAllVips: async () => db.getAllVips(),
        __dbSetAdmin: async (auth, name, level) => { await db.setAdmin(auth, name, level); },
        __dbRemoveAdmin: async (auth) => { await db.removeAdmin(auth); },
        __dbGetAllAdmins: async () => db.getAllAdmins(),
        __dbAddWarning: async (auth, name, reason, byAuth, byName) => { await db.addWarning(auth, name, reason, byAuth, byName); },
        __dbRemoveWarning: async (auth, index) => db.removeWarning(auth, index),
        __dbGetWarnings: async (auth) => db.getWarnings(auth),
        __dbGetAllWarnings: async () => db.getAllWarnings(),
        // cuentas (registro / login)
        __dbRegisterAccount: async (username, password, auth) => db.registerAccount(username, password, auth),
        __dbLoginAccount: async (username, password, auth) => db.loginAccount(username, password, auth),
        __dbLogoutAccount: async (auth) => db.logoutAuth(auth),
        __dbDeleteAccount: async (auth) => db.deleteAccount(auth),
        __dbGetAccountByAuth: async (auth) => db.getAccountByAuth(auth),
        __dbResetAccountPassword: async (username, newPassword) => db.resetAccountPassword(username, newPassword),
        // anti-VPN: la "conn" de HaxBall es la IP en hex ASCII
        __checkVPN: async (conn) => {
            try {
                const ip = Buffer.from(String(conn), 'hex').toString('ascii');
                if (!/^[0-9a-fA-F.:]+$/.test(ip)) return false;
                if (vpnCache.has(ip)) return vpnCache.get(ip);
                const resp = await fetch('http://ip-api.com/json/' + ip + '?fields=status,proxy,hosting', { signal: AbortSignal.timeout(3000) });
                if (!resp.ok) return false;
                const data = await resp.json();
                const isVpn = data.status === 'success' && (data.proxy === true || data.hosting === true);
                vpnCache.set(ip, isVpn);
                return isVpn;
            } catch (e) {
                return false;
            }
        }
    };
};
