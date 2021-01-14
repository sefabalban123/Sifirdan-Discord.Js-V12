module.exports = {
    name: "ban",
    description: "Kişiyi Banlar.",
    category: "Yetkili",
    guildOnly: true,
    permission: "BAN_MEMBERS",
    execute(message, args, Embed){
        const mentionedPlayer = message.mentions.members.first();
        if(!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketleyin!", "info"));

        message.guild.members.ban(mentionedPlayer)
        .then(() => {
            message.channel.send(Embed("", `${mentionedPlayer.displayName} Sunucudan Yasaklandı!`))
        })
        .catch(() => {
            message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Yetkisi Benim Yetkimden Daha Büyük Olduğu İçin Bu Kişiyi Yasaklayamıyorum!`, "error"))
        })
    }
}