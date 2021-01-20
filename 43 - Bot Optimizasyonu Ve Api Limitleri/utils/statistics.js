module.exports = (client, Tags) => {

    // Functions
    async function updateAllMembers(guild) {
        const tag = await Tags.findOne({ where: { guild_id: guild.id } });

        if (!tag.get("statistic_enabled")) return

        const data = tag.get("statistic_data");

        const channel = guild.channels.cache.get(data.all_members_channel_id);
        if (!channel) return;

        const memberCount = guild.memberCount;

        channel.setName(`Toplam Üye - ${memberCount}`);
    }

    async function updateOnlineMembers(guild, data) {

        const onlineChannel = guild.channels.cache.get(data.online_members_channel_id);
        const recordChannel = guild.channels.cache.get(data.record_members_channel_id);

        if (!onlineChannel || !recordChannel) return

        const onlineMemberCount = guild.members.cache.filter(member => member.presence.status == "online" || member.presence.status == "idle" || member.presence.status == "dnd").size

        const lastRecordMember = data.record_online;

        onlineChannel.setName(`Online Üye - ${onlineMemberCount}`);

        if (lastRecordMember < onlineMemberCount) {

            recordChannel.setName(`Rekor Üye - ${onlineMemberCount}`)

            data.record_online = onlineMemberCount;

            await Tags.update({ statistic_data: data }, { where: { guild_id: guild.id } });
        }
    }

    setInterval(async () => {

        const guilds = await Tags.findAll({ where: { statistic_enabled: true } })
        guilds.forEach(guild_db => {
            const guild = client.guilds.cache.get(guild_db.dataValues.guild_id);

            updateOnlineMembers(guild, guild_db.dataValues.statistic_data);
        })

    }, );

    // On Player Join
    client.on("guildMemberAdd", member => {
        updateAllMembers(member.guild);
    })

    // On Player Leave
    client.on("guildMemberRemove", member => {
        updateAllMembers(member.guild);
    })

}