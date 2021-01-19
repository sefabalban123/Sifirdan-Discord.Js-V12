module.exports = {
    name: "ban",
    description: "Kişiyi Banlar.",
    category: "Yetkili",
    guildOnly: true,
    permission: "BAN_MEMBERS",
    execute(message, args, Embed) {
        const mentionedPlayer = message.mentions.members.first();
        if (!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketleyin!", "info"));

        message.channel.send(Embed("", `${mentionedPlayer} Adlı Oyuncuyu Yasaklamak İstediğinize Emin Misiniz?`, "info")).then(async msg => {

            await msg.react("👍");

            const filter = (reaction, user) => reaction.emoji.name == "👍" && user.id == message.author.id;
            const collector = msg.createReactionCollector(filter, { max: 1, time: 5000 });

            collector.on("collect", (reaction, user) => {
                message.guild.members.ban(mentionedPlayer)
                    .then(() => {
                        msg.delete();
                        message.channel.send(Embed("", `${mentionedPlayer.displayName} Sunucudan Yasaklandı!`))
                    })
                    .catch(() => {
                        message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Yetkisi Benim Yetkimden Daha Büyük Olduğu İçin Bu Kişiyi Yasaklayamıyorum!`, "error"))
                    })
            })

            collector.on("end", (reaction, user) => {
                if (!reaction.size) {
                    message.channel.send(Embed("", "Belirtilen Süre İçerisinde İşlemi Onaylamadığınız İçin İptal Edildi!", "error"));
                    msg.delete();
                }
            })

        })
    }
}