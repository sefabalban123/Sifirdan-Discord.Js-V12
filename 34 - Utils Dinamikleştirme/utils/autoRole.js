module.exports = (client, Tags) => {

    client.on("guildMemberAdd", async member => {

        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } });
        const data = tag.get("auto_role");

        if(data.enabled){

            const role = member.guild.roles.cache.get(data.role_id);
            if(!role) return;

            member.roles.add(role)
            .catch(() => {});

        }

    })

}