module.exports = {
    botName: "⚡ Kira MD ⚡",
    ownerName: "ᴷᴵᴺᴳ𝑀𝑈𝑅𝑃𝐻𝑌®",
    ownerNumber: "+242057954499",
    
    session: "./session", // Dossier où la session est enregistrée
    
    // Configuration des préfixes de commandes
    prefix: "!",  
    commands: {
        menu: "menu",
        owner: "owner",
        help: "help",
        spam: "spam",
        kick: "kick",
        promote: "promote",
        demote: "demote",
        tagall: "tagall",
        ytmp3: "ytmp3",
        ytmp4: "ytmp4",
        sticker: "sticker",
        bienvenue: "bienvenue",
        goodbye: "goodbye"
    },

    // Messages personnalisés
    messages: {
        welcome: "👋 Bienvenue dans le groupe ! Profitez de votre séjour ici.",
        goodbye: "👋 Quelqu'un vient de partir... À bientôt !",
        onlyAdmin: "❌ Cette commande est réservée aux administrateurs.",
        onlyOwner: "❌ Seul le propriétaire peut exécuter cette commande.",
        success: "✅ Commande exécutée avec succès !",
        error: "❌ Une erreur s'est produite. Réessayez plus tard."
    },

    // Configuration des liens
    links: {
        sessionGenerator: "https://murphy-md.onrender.com",
        github: "https://github.com/mikaelsonangel844/Kira-MD",
        whatsappChannel: "https://whatsapp.com/channel/0029VbAFYaTJUM2eqTzlkp1B"
    },

    // Style des logs (Console)
    logStyle: {
        success: "✅",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️"
    }
};
