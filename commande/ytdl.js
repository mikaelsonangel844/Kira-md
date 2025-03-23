const ytdl = require("ytdl-core");
const fs = require("fs-extra");
const path = require("path");

const downloadYT = async (sock, msg, from, command, args) => {
    if (!args[0]) {
        return sock.sendMessage(from, { text: "❌ *Veuillez fournir un lien YouTube !*" }, { quoted: msg });
    }

    const url = args[0];
    const isValid = ytdl.validateURL(url);
    if (!isValid) {
        return sock.sendMessage(from, { text: "❌ *Lien YouTube invalide !*" }, { quoted: msg });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const outputPath = path.join(__dirname, `./temp/${title}.mp4`);
    
    try {
        if (command === "!ytmp3") {
            const audioPath = outputPath.replace(".mp4", ".mp3");
            const stream = ytdl(url, { filter: "audioonly" }).pipe(fs.createWriteStream(audioPath));
            stream.on("finish", async () => {
                await sock.sendMessage(from, { audio: { url: audioPath }, mimetype: "audio/mp4" }, { quoted: msg });
                fs.unlinkSync(audioPath);
            });
        } else if (command === "!ytmp4") {
            const stream = ytdl(url, { filter: "videoandaudio" }).pipe(fs.createWriteStream(outputPath));
            stream.on("finish", async () => {
                await sock.sendMessage(from, { video: { url: outputPath }, caption: `🎬 *${title}*` }, { quoted: msg });
                fs.unlinkSync(outputPath);
            });
        }
    } catch (error) {
        console.error(error);
        sock.sendMessage(from, { text: "❌ *Erreur lors du téléchargement !*" }, { quoted: msg });
    }
};

module.exports = downloadYT;
