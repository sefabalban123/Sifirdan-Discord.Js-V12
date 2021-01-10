module.exports = {
    name: "otorol",
    description: "Sunucuya Katılan Kullanıcılara Otomatik Olarak Belirlediğiniz Rolü Verir.",
    cooldown: 3,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    category: "Yetkili",
    async execute(message, args, Embed, Discord, Tags, tag) {

        const data = tag.get("auto_role");
        const bot = message.guild.members.cache.get(message.client.user.id)
        const prefix = tag.get("prefix");

        if (args[0] == "aktif") {
            const role = message.guild.roles.cache.get(data.role_id);
            if (!role) return message.channel.send(Embed("", `Lütfen Otomatik Rolü Aktifleştirmeden Önce \`${prefix}otorol rol @rol\` Komutunu Kullanarak Otomatik Rolü Belirleyiniz.`, "info"))

            bot.roles.add(role)
                .then(async () => {
                    bot.roles.remove(role)

                    data.enabled = true;
                    await Tags.update({ auto_role: data }, { where: { guild_id: message.guild.id } })
                    return message.channel.send(Embed("", "Otomatik Rol Başarıyla Aktifleştirildi."));
                })
                .catch(() => {
                    return message.channel.send(Embed("", "Belirtilen Rol Yetkimin Üzerinde Olduğu Veya Rol Silindiği İçin Otomatik Rol Olarak Kaydedilemiyor.", "error"))
                })

        }
        else if (args[0] == "pasif") {

            data.enabled = false;
            await Tags.update({ auto_role: data }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Otomatik Rol Başarıyla Pasifleştirildi."));

        }
        else if (args[0] == "rol") {

            const mentionedRole = message.mentions.roles.first();
            if (!mentionedRole) return message.channel.send(Embed("", "Lütfen Bir Rol Etiketleyiniz.", "info"))

            bot.roles.add(mentionedRole)
                .then(async () => {
                    bot.roles.remove(mentionedRole);
                    data.role_id = mentionedRole.id;
                    
                    await Tags.update({ auto_role: data }, { where: { guild_id: message.guild.id } })
                    return message.channel.send(Embed("", `Otomatik Verilecek Rol ${mentionedRole.name} Olarak Ayarlandı!`))
                })
                .catch(() => {
                    return message.channel.send(Embed("", "Belirtilen Rol Yetkimin Üzerinde Olduğu Veya Rol Silindiği İçin Otomatik Rol Olarak Kaydedilemiyor.", "error"))
                })

        }
        else {

        }

    }
}