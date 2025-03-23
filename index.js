const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const axios = require('axios');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    // Fonction pour envoyer le statut du bot au serveur
    async function updateStatus(status) {
        try {
            await axios.post('https://murphy-md.onrender.com/status', { status });
            console.log(`Statut mis à jour: ${status}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut:", error.message);
        }
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
            console.log("✅ Bot connecté !");
            await updateStatus('connected');
        } else if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log("🚨 Bot déconnecté, raison:", reason);
            await updateStatus('disconnected');

            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Session expirée. Relance manuelle requise.");
            } else {
                console.log("🔄 Reconnexion en cours...");
                startBot(); // Relance automatique du bot
            }
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;
        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (text === '!ping') {
            await sock.sendMessage(from, { text: 'Pong!' });
        }
    });
}

startBot();
