module.exports = {
    name: "tag",
    description: "Kişinin Etiketini Değiştirir.",
    category: "Yetkili",
    cooldown: 5,
    guildOnly: true,
    permission: "MANAGE_NICKNAMES",
    execute(message, args, Embed, Discord){

        const mentionedPlayer = message.mentions.members.first()

        if(!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketleyin.", "info"))

        const newNickname = args.splice(1, args.length-1).join(" ")

        mentionedPlayer.setNickname(newNickname).then(() => {
            return message.channel.send(Embed("", `${mentionedPlayer.user.username} Adlı Kişinin Etiketi Başarıyla ${newNickname} Olarak Değiştirildi.`));
        }).catch(() => {
            return message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Yetkisi Benim Yetkimin Üzerinde Olduğu İçin Etiketini Değiştiremiyorum.`, "error"));
        })

    }
}