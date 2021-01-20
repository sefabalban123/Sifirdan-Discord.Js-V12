module.exports = {
    name: "reklamengelle",
    description: "Başka Discordların Davet Linklerinin Sunucunuzda Gönderilmesini Engeller.",
    cooldown: 5,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    category: "Yetkili",
    async execute(message, args, Embed, Discord, Tags, tag) {

        const prefix = tag.get("prefix");

        if (args[0] == "aktif") {
            
            await Tags.update({advertise_protect_enabled: true}, {where: {guild_id: message.guild.id}});
            return message.channel.send(Embed("", "Reklam Koruması Başarıyla Aktifleştirildi."));

        }
        else if (args[0] == "pasif") {

            await Tags.update({advertise_protect_enabled: false}, {where: {guild_id: message.guild.id}});
            return message.channel.send(Embed("", "Reklam Koruması Başarıyla Pasifleştirildi."));

        }
        else {

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle(`Reklam Engelleme Sistemi`)
                .setColor("#b6ffa6")
                .setDescription("Kullanıcıların Başka Discord Sunucularının Reklamlarını Yapmalarını Engeller.\n\u200b")
                .addFields(
                    { name: `Gereken Yetki:`, value: "Yönetici", inline: true },
                    { name: `${prefix}reklamengelle aktif`, value: "Reklam Engellemeyi Aktifleştirir." },
                    { name: `${prefix}reklamengelle pasif`, value: "Reklam Engellemeyi Pasifleştirir." },
                )

            message.channel.send(infoEmbed);

        }

    }
}