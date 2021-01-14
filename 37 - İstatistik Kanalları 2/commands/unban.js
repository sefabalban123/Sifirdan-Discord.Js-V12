module.exports = {
    name: "unban",
    description: "Kişinin Yasaklamasını Kaldırır.",
    category: "Yetkili",
    guildOnly: true,
    permission: "BAN_MEMBERS",
    execute(message, args, Embed){
        const bannedPlayerID = args[0];

        if(!bannedPlayerID.length) return message.channel.send(Embed("", "Lütfen Bir Kullanıcının ID'sini Girin.", "info"));

        message.guild.members.unban(bannedPlayerID)
        .then(() => {
            return message.channel.send(Embed("", `Kişinin Banı Kaldırıldı!`))
        })
        .catch(() => {
            return message.channel.send(Embed("", 'Bu ID\'ye Sahip Bir Kullanıcı Bulunamadı Veya Bu Kullanıcı Yasaklı Değil!', "error"))
        })
    }
}