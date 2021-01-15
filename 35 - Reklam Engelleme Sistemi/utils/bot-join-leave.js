module.exports = (client, Tags) => {

    client.on("guildCreate", async guild => {

        try {
            await Tags.create({ guild_id: guild.id })
        } catch { }

    })

    client.on("guildDelete", async guild => {
        try {
            await Tags.destroy({ where: { guild_id: guild.id } })
        } catch { }
    })

}