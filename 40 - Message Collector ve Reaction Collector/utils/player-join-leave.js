module.exports = (client, Tags, Embed) => {

    // Player Join
    client.on('guildMemberAdd', async member => {

        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } });
        const data = tag.get("welcome_message");

        if(data.enabled){
            const channel = member.guild.channels.cache.get(data.channel_id);
            if(!channel) return;
            const text = data.message.replace('%kullanıcı%', member.displayName).replace("%toplam_üye%", member.guild.memberCount);

            channel.send(Embed("", text));
        }
    })
    
    // Player Leave
    client.on('guildMemberRemove', async member => {

        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } });
        const data = tag.get("leave_message");

        if (data.enabled) {
            const textChannel = member.guild.channels.cache.get(data.channel_id);
            if (!textChannel) return

            const text = data.message.replace('%kullanıcı%', member.displayName).replace("%toplam_üye%", member.guild.memberCount);
            textChannel.send(Embed("", text));
        }

    })

}
