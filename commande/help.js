const help = async (sock, msg, from) => {
    const helpMessage = `
*📜 Liste des commandes disponibles :*

🔹 *!menu* - Affiche le menu des commandes  
🔹 *!owner* - Affiche les informations du propriétaire  
🔹 *!kick @user* - Expulse un membre du groupe (admin uniquement)  
🔹 *!promote @user* - Promeut un membre en admin (admin uniquement)  
🔹 *!demote @user* - Rétrograde un admin en membre (admin uniquement)  
🔹 *!tagall* - Mentionne tous les membres du groupe  
🔹 *!ytmp3 [lien]* - Télécharge l’audio d’une vidéo YouTube  
🔹 *!ytmp4 [lien]* - Télécharge la vidéo YouTube  
🔹 *!sticker* - Convertit une image/GIF en sticker  
🔹 *!welcome* - Active/Désactive le message de bienvenue  
🔹 *!goodbye* - Active/Désactive le message d’au revoir  

📌 *Tape une commande pour l'exécuter !*
    `;
    
    await sock.sendMessage(from, { text: helpMessage }, { quoted: msg });
};

module.exports = help;
