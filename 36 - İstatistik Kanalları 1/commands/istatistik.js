async function statisticCreate(message, tag, Tags, Embed) {

    const { guild } = message;

    await guild.channels.create("İstatistikler", {
        type: "category", permissionOverwrites: [
            {
                "id": guild.roles.everyone,
                "deny": ["CONNECT"]
            }
        ]
    }).then(async ctg => {

        const membersCount = guild.memberCount;
        const onlineMembersCount = guild.members.cache.filter(member => member.presence.status == "online" || member.presence.status == "idle" || member.presence.status == "dnd").size

        const allMembersChannel = await guild.channels.create(`Toplam Üye - ${membersCount}`, { type: "voice" });
        const onlineMembersChannel = await guild.channels.create(`Online Üye - ${onlineMembersCount}`, { type: "voice" });
        const recordMembersChannel = await guild.channels.create(`Rekor Üye - ${onlineMembersCount}`, { type: "voice" });

        allMembersChannel.setParent(ctg.id);
        onlineMembersChannel.setParent(ctg.id);
        recordMembersChannel.setParent(ctg.id);

        const data = tag.get("statistic_data");

        data.category_channel_id = ctg.id;
        data.all_members_channel_id = allMembersChannel.id;
        data.online_members_channel_id = onlineMembersChannel.id;
        data.record_members_channel_id = recordMembersChannel.id;
        data.record_online = onlineMembersCount

        await Tags.update({ statistic_enabled: true }, { where: { guild_id: guild.id } });
        await Tags.update({ statistic_data: data }, { where: { guild_id: guild.id } });

        return message.channel.send(Embed("", "İstatistik Kanalları Başarıyla Kuruldu."));
    })

}

async function statisticDelete(message, tag, Tags, Embed, type = "") {

    const { guild } = message;

    const data = tag.get("statistic_data");

    try { await guild.channels.cache.get(data.all_members_channel_id).delete() } catch { }
    try { await guild.channels.cache.get(data.online_members_channel_id).delete() } catch { }
    try { await guild.channels.cache.get(data.record_members_channel_id).delete() } catch { }
    try { await guild.channels.cache.get(data.category_channel_id).delete() } catch { }

    data.category_channel_id = "";
    data.all_members_channel_id = "";
    data.online_members_channel_id = "";
    data.record_members_channel_id = "";
    data.record_online = 0

    await Tags.update({ statistic_enabled: false }, { where: { guild_id: guild.id } });
    await Tags.update({ statistic_data: data }, { where: { guild_id: guild.id } });

    if(type) statisticCreate(message, tag, Tags, Embed);

    return message.channel.send(Embed("", "İstatistik Kanalları Başarıyla Silindi."));
}

module.exports = {
    name: "istatistik",
    cooldown: 5,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    description: "İstatistik Kanallarını Kurar.",
    category: "Yetkili",
    async execute(message, args, Embed, Discord, Tags, tag, emojis) {

        if (args[0] == "kur") {

            statisticCreate(message, tag, Tags, Embed);

        }
        else if (args[0] == "sil") {

            statisticDelete(message, tag, Tags, Embed);

        }
        else if (args[0] == "yenile") {

            if (tag.get("statistic_enabled")) {

                statisticDelete(message, tag, Tags, Embed, "reload");

            } else {
                return message.channel.send(Embed("", "İstatistik Kanallarını Yenileyebilmeniz İçin Öncelikle Aktif Etmeniz Gerekiyor.", "info"));
            }

        }
        else {

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle(`📈 İstatistik`)
                .setColor('#fff78a')
                .setDescription('Sunucunuzdaki Ses Kanalına Bağlı Üye, Toplam Üye, Online Üye ve Rekor Online Sayısını Takip Edebileceğiniz İstatistik Kanallarını Kurar. İstatistikler 2 Dakikada Sonra Güncellenir. Çok Fazla İstek Yollanması Durumunda Kısa Süreliğine İstatistikler Hatalı Gösterilebilir.\n\u200b')
                .addFields(
                    { name: `Gereken Yetki:`, value: `Yönetici\n\u200b` },
                    { name: `${tag.get('prefix')}istatistik kur`, value: 'İstatistik Kanallarını Kurar.\n\u200b' },
                    { name: `${tag.get('prefix')}istatistik sil`, value: 'İstatistik Kanallarını Siler.\n\u200b' },
                    { name: `${tag.get('prefix')}istatistik yenile`, value: 'İstatistik Kanallarını Yeniler.' },
                )

            message.channel.send(infoEmbed);

        }

    }
}