const { prefix } = require('../config.json')

module.exports = {
    name: "linkengelleme",
    cooldown: 5,
    permission: "ADMINISTRATOR",
    category: "Yetkili",
    description: "Kullanıcıların Link Göndermesini Engeller",
    guildOnly: true,
    aliases: ["link-engelleme", "linkengel"],
    async execute(message, args, Embed, Discord, Tags, tag) {

        if (args[0] == "aktif") {

            await Tags.update({ link_protect_enabled: true }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Link Engelleme Sistemi Başarıyla Aktifleştirildi."))
        }
        else if (args[0] == "pasif") {

            await Tags.update({ link_protect_enabled: false }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Link Engelleme Sistemi Başarıyla Pasifleştirildi."))
        }
        else {

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Link Engelleme Sistemi")
                .setColor("#a6ffc2")
                .setDescription("Bu Komutu Kullanarak Kullanıcıların Link Göndermesini Engelleyebilirsiniz.\n\u200b")
                .addFields(
                    { name: `${prefix}linkengelleme aktif`, value: "Link Engelleme Sistemini Aktifleştirir." },
                    { name: `${prefix}linkengelleme pasif`, value: "Link Engelleme Sistemini Pasifleştirir." },
                )

            message.channel.send(infoEmbed);
        }

    }
}