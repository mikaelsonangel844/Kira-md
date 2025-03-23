const moderation = async (sock, msg, from, command, args, groupMetadata) => {
    const groupAdmins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);
    const isAdmin = groupAdmins.includes(msg.key.participant || msg.key.remoteJid);
    
    if (!isAdmin) {
        return sock.sendMessage(from, { text: "❌ *Seuls les admins peuvent utiliser cette commande !*" }, { quoted: msg });
    }

    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentioned.length === 0) {
        return sock.sendMessage(from, { text: "⚠️ *Mentionne un utilisateur !*" }, { quoted: msg });
    }

    switch (command) {
        case '!kick':
            await sock.groupParticipantsUpdate(from, mentioned, "remove");
            sock.sendMessage(from, { text: "✅ Utilisateur expulsé !" }, { quoted: msg });
            break;
        case '!promote':
            await sock.groupParticipantsUpdate(from, mentioned, "promote");
            sock.sendMessage(from, { text: "✅ Utilisateur promu admin !" }, { quoted: msg });
            break;
        case '!demote':
            await sock.groupParticipantsUpdate(from, mentioned, "demote");
            sock.sendMessage(from, { text: "✅ Admin rétrogradé !" }, { quoted: msg });
            break;
        case '!tagall':
            const tagText = `📢 *Mention de tous les membres :*\n\n${groupMetadata.participants.map(p => `@${p.id.split('@')[0]}`).join('\n')}`;
            sock.sendMessage(from, { text: tagText, mentions: groupMetadata.participants.map(p => p.id) }, { quoted: msg });
            break;
    }
};

module.exports = moderation;
