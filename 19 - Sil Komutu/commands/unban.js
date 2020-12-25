module.exports = {
    name: "unban",
    guildOnly: true,
    permission: "BAN_MEMBERS",
    execute(message, args, client, Embed){
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