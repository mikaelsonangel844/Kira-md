const spam = async (sock, msg, from, args) => {
    if (args.length < 2) {
        return sock.sendMessage(from, { text: "❌ *Utilisation :* `!spam <nombre> <message>`" }, { quoted: msg });
    }

    const count = parseInt(args[0]);
    const message = args.slice(1).join(" ");

    if (isNaN(count) || count <= 0 || count > 20) {
        return sock.sendMessage(from, { text: "❌ *Le nombre doit être entre 1 et 20 !*" }, { quoted: msg });
    }

    for (let i = 0; i < count; i++) {
        await sock.sendMessage(from, { text: message });
    }
};

module.exports = spam;
