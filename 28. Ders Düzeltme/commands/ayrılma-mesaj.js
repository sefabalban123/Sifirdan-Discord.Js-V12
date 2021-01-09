const { prefix } = require('../config.json');

module.exports = {
    name: "ayrılma-mesaj",
    category: "Yetkili",
    description: "Ayrılma Mesajı Gönderir.",
    permission: "ADMINISTRATOR",
    cooldown: 3,
    guildOnly: true,
    aliases: ["ayrılmamesaj", "amesaj"],
    async execute(message, args, Embed, Discord, Tags, tag) {

        const data = tag.get("leave_message");

        if (args[0] == "kanal") {

            const channel = message.mentions.channels.first();
            if (!channel) return message.channel.send(Embed("", "Lütfen Bir Kanal Etiketleyiniz.", "info"));

            data.channel_id = channel.id;

            await Tags.update({ leave_message: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", `${channel} Adlı Kanal Başarıyla Ayarlandı.`));

        }
        else if (args[0] == "mesaj") {

            const text = args.splice(1, args.length - 1).join(" ");
            if (!text) return message.channel.send(Embed("", "Lütfen Bir Mesaj Giriniz.", "info"));

            data.message = text;

            await Tags.update({ leave_message: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", `Mesaj Başarıyla Ayarlandı.`));
        }
        else if (args[0] == "aktif") {
            data.enabled = true;
            await Tags.update({ leave_message: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", "Ayrılma Mesajı Başarıyla Aktifleştirildi."));
        }
        else if (args[0] == "pasif") {
            data.enabled = false;
            await Tags.update({ leave_message: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", "Ayrılma Mesajı Başarıyla Pasifleştirildi."));
        }
        else {
            let isEnabled = data.enabled;
            if(isEnabled) isEnabled = "Aktif";
            else isEnabled = "Pasif";

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Ayrılma Mesaj Sistemi")
                .setColor("#b6ffa6")
                .setDescription("Bu Komutu Kullanarak Ayrılma Mesajları Oluşturabilirsiniz.\n\u200b")
                .addFields(
                    { name: `Gereken Yetki:`, value: "Yönetici", inline: true },
                    { name: `Aktiflik Durumu:`, value: `${isEnabled}\n\u200b`, inline: true },
                    { name: `${prefix}ayrılma-mesaj aktif`, value: "Ayrılma Mesajını Aktifleştirir" },
                    { name: `${prefix}ayrılma-mesaj pasif`, value: "Ayrılma Mesajını Pasifleştirir." },
                    { name: `${prefix}ayrılma-mesaj mesaj <mesaj>`, value: "Ayrılma Mesajını Belirler." },
                    { name: `${prefix}ayrılma-mesaj kanal #kanal`, value: "Ayrılma Mesajı Kanalını Belirler." },
                    { name: `${prefix}ayrılma-mesaj test`, value: "Ayrılma Sistemi Test Mesajını Gönderir." }
                )

            message.channel.send(infoEmbed);
        }

    }
}