module.exports = (client, Tags) => {

    client.on("messageReactionAdd", async (reaction, user) => {

        if (reaction.partial) {
            await reaction.fetch();
        }

        const tag = await Tags.findOne({ where: { guild_id: reaction.message.guild.id } })
        const data = tag.get("giveaway")

        if (!data) return;

        if (reaction.message.id == data[reaction.message.channel.id].message_id) {

            if (!data[reaction.message.channel.id].users_list.includes(user.id)) {
                data[reaction.message.channel.id].users_list.push(user.id);

                await Tags.update({ giveaway: data }, { where: { guild_id: reaction.message.guild.id } })
            }

        }
    })

    client.on("messageReactionRemove", async (reaction, user) => {

        if (reaction.partial) {
            await reaction.fetch();
        }

        const tag = await Tags.findOne({ where: { guild_id: reaction.message.guild.id } })
        const data = tag.get("giveaway")

        if (!data) return;

        if (reaction.message.id == data[reaction.message.channel.id].message_id) {

            if (data[reaction.message.channel.id].users_list.includes(user.id)) {

                data[reaction.message.channel.id].users_list.splice(data[reaction.message.channel.id].users_list.indexOf(user.id), 1)

                await Tags.update({ giveaway: data }, { where: { guild_id: reaction.message.guild.id } })

            }

        }

    })

    client.on("messageReactionRemoveAll", async message => {
        
        const tag = await Tags.findOne({ where: { guild_id: message.guild.id } })
        const data = tag.get("giveaway")

        if (!data) return;

        if (message.id == data[message.channel.id].message_id) {

            delete data[message.channel.id];

            await Tags.update({ giveaway: data }, { where: { guild_id: message.guild.id } })

        }
    })

}