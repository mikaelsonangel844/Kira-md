case '!menu':
    const menu = `✨ *Menu Murphy-Kill* ✨
    
📌 *Modération*  
- !kick @user → Expulse un membre  
- !promote @user → Promote admin  
- !demote @user → Rétrograde admin  
- !tagall → Mentionne tous les membres  

📥 *Téléchargement*  
- !ytmp3 [lien] → Télécharge l’audio d’une vidéo YouTube  
- !ytmp4 [lien] → Télécharge la vidéo YouTube  

🎭 *Fun & IA*  
- !sticker → Convertit une image en sticker  
- !ask [question] → Pose une question à l'IA  

⚙️ *Autres*  
- !ping → Vérifie si le bot est actif  
- !owner → Affiche les infos du propriétaire`;

    sock.sendMessage(from, { text: menu }, { quoted: msg });
    break;
