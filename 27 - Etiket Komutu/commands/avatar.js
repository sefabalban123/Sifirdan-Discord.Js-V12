module.exports = {
    name: "avatar",
    description: "Kişinin Avatarını Gönderir.",
    category: "Genel",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, Embed, Discord){

        const mentionedPlayer = message.mentions.members.first();
        if(!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketleyiniz.", "info"));
    
        const playerAvatar = mentionedPlayer.user.avatarURL({ dynamic: true, format: 'png', size: 256 });
        
        if(playerAvatar == null) return message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Bir Avatarı Yok!`, "error"));

        message.channel.send(playerAvatar);
    }
}