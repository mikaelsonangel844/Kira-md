const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const { session } = require("./config"); // Fichier de session
const showMenu = require("./commands/menu");
const showOwner = require("./commands/owner");
const help = require("./commands/help");
const spam = require("./commands/spam");
const moderation = require("./commands/moderation");
const downloadYT = require("./commands/ytdl");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(session);
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === 401) {
                console.log("❌ Session invalide. Supprime le dossier de session et reconnecte.");
            } else {
                console.log("🔄 Reconnexion en cours...");
                startBot();
            }
        } else if (connection === "open") {
            console.log("✅ Bot connecté avec succès !");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!body) return;

        const args = body.trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case "!menu":
                showMenu(sock, msg, from);
                break;
            case "!owner":
                showOwner(sock, msg, from);
                break;
            case "!help":
                help(sock, msg, from);
                break;
            case "!spam":
                spam(sock, msg, from, args);
                break;
            case "!kick":
            case "!promote":
            case "!demote":
            case "!tagall":
                moderation(sock, msg, from, command, args);
                break;
            case "!ytmp3":
            case "!ytmp4":
                downloadYT(sock, msg, from, command, args);
                break;
            default:
                sock.sendMessage(from, { text: "❌ Commande inconnue. Tape *!help* pour voir la liste des commandes." }, { quoted: msg });
        }
    });
}

startBot();
