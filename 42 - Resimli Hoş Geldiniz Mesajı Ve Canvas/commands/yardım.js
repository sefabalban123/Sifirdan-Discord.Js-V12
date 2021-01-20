module.exports = {
    name: "yardım",
    cooldown: 5,
    guildOnly: true,
    aliases: ['help'],
    execute(message, args, Embed, Discord, Tags, tag){

        const prefix = tag.get("prefix");

        const infoEmbed = new Discord.MessageEmbed()
            .setDescription("Merhabalar, Rise Bot Sahip Olduğu Onlarca Özellik Sayesinde Sunucunuzu Güzelleştirmek Ve Moderasyonunu Daha Kolay Hale Getirmek İçin Tasarlanmış Bir Bottur. Komutlar Hakkında Bilgi Almak İçin Komutun Adını Yazarak Detaylı Bilgiye Ulaşabilirsiniz.\n\u200b")
            .addFields(
                {name: `:speech_balloon: Genel`, value: `**${prefix}genel** Yazarak Genel Komutları Görüntüleyebilirsiniz.`, inline: true},
                {name: `⚚ Yetkili`, value: `**${prefix}yetkili** Yazarak Yetkili Komutlarını Görüntüleyebilirsiniz.`, inline: true},
                {name: `🛡️ Güvenlik`, value: `**${prefix}güvenlik** Yazarak Güvenlik Komutlarını Görüntüleyebilirsiniz.\n\u200b`, inline: true},
                {name: '\u200B', value: '\u200B', inline: true},
                {name: "🤖 Bot", value: `**${prefix}bot** Yazarak Bot Hakkındaki Komutları Görüntüleyebilirsiniz.`, inline: true},
                {name: '\u200B', value: '\u200B', inline: true},
                {name: "\u200B", value: "[🔻 Sunucuna Ekle](https://www.google.com)", inline: true},
                {name: "\u200B", value: "[🔸 Resmi Sunucu](https://www.google.com)", inline: true},
                {name: "\u200B", value: "[🔔 Oy Ver](https://www.google.com)", inline: true},
            )
            .setColor("#8fffb8")
            .setFooter("YouTube Bot", "https://i.hizliresim.com/T4UiAl.gif")
            .setImage("https://i.hizliresim.com/T4UiAl.gif")
        
        message.channel.send(infoEmbed);
    }
}

// \n\u200b
// \u200B