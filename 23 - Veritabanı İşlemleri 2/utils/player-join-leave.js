module.exports = (client, Discord) => {

    // Player Join
    client.on('guildMemberAdd', member => {

        const textChannel = member.guild.channels.cache.get("791277406794940436");
        textChannel.send(`${member} Adlı Kişi Sunucuya Katıldı!`);

    })
    
    // Player Leave
    client.on('guildMemberRemove', member => {

        const textChannel = member.guild.channels.cache.get("791277406794940436");
        textChannel.send(`${member.user.username} Adlı Kişi Sunucudan Ayrıldı!`);

    })

}