module.exports = {
    name: "çekiliş",
    permission: "ADMINISTRATOR",
    async execute(message, args, Embed, Discord, Tags, tag, emojis) {

        const data = tag.get("giveaway");

        if (args[0] == "başlat") {

            const number = parseInt(args[1])
            if (isNaN(number)) return message.channel.send(Embed("", "Lütfen Geçerli Bir Sayı Giriniz.", "info"));
            if (number < 1) return message.channel.send(Embed("", "Lütfen 0'dan Büyük Bir Sayı Giriniz.", "info"));

            const text = args.splice(2, args.length - 1).join(" ");
            if (!text) return message.channels.send(Embed("", "Lütfen Bir Çekiliş Mesajı Giriniz.", "info"));

            message.channel.send(Embed("", text)).then(async msg => {

                data[message.channel.id] = { message_id: msg.id, winner_count: number, users_list: [] };
                await Tags.update({ giveaway: data }, { where: { guild_id: message.guild.id } });

                await msg.react("🎉");

            })

        }
        else if (args[0] == "bitir") {

            const data = tag.get("giveaway");

            if (!data[message.channel.id]) return message.channel.send(Embed("", "Bu Kanalda Devam Eden Bir Çekiliş Yok!", "info"));

            try {
                const msg = await message.channel.messages.fetch(data[message.channel.id].message_id);

                let winnerCount = data[message.channel.id].winner_count;
                const users_list = data[message.channel.id].users_list;

                if (users_list.length < winnerCount) winnerCount = users_list.length;

                const winners_ids_list = [];
                let count = 0;
                do {
                    const randomNumber = Math.floor(Math.random() * users_list.length);

                    if (!winners_ids_list.includes(users_list[randomNumber])) {
                        winners_ids_list.push(users_list[randomNumber]);
                        count += 1;
                    }

                } while (count < winnerCount)

                const winners_list = [];
                for (const winner of winners_ids_list) {

                    winners_list.push(message.guild.members.cache.get(winner));

                }

                const infoEmbed = new Discord.MessageEmbed()
                    .setColor("#a6ffc2")
                    .setTitle("Çekilişin Kazananları")
                    .setDescription(winners_list.join(" - "))

                message.channel.send(infoEmbed);


            } catch {
                message.channel.send(Embed("", "Çekiliş Mesajı Silindiği İçin Çekiliş Sonuçlandırılamıyor. Çekiliş İptal Edildi!", "error"))
                delete data[message.channel.id];
                await Tags.update({ giveaway: data }, { where: { guild_id: message.guild.id } });
            }

        }
        else {
            const prefix = tag.get("prefix");

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Çekiliş")
                .setDescription("Çekiliş Başlatır.")
                .setColor("#f0f0f0")
                .addFields(
                    { name: `${prefix}çekiliş başlat <kazanan sayısı> <çekiliş mesajı>`, value: `Çekilişi Başlatır.` },
                    { name: `${prefix}çekiliş bitir`, value: `Çekilişi Sonlandırır.` }
                )

            message.channel.send(infoEmbed);

        }

    }
}