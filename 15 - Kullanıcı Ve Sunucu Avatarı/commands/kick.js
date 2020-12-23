module.exports = {
    name: "kick",
    guildOnly: true,
    permission: "KICK_MEMBERS",
    execute(message, args, client, Embed){
        const mentionedPlayer = message.mentions.members.first();
        if(!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketleyin!", "info"));

        mentionedPlayer.kick()
        .then(() => {
            message.channel.send(Embed("", `${mentionedPlayer.displayName} Sunucudan Atıldı!`))
        })
        .catch(() => {
            message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Yetkisi Benim Yetkimden Daha Büyük Olduğu İçin Bu Kişiyi Kickleyemiyorum!`, "error"))
        })
    }
}