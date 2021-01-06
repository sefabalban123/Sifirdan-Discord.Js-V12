module.exports = (client, Tags) => {
    client.on("guildMemberAdd", async member => {

        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } })
        const data = tag.get("tag");

        if(data.enabled){
            try{
                const newNickname = data.tag_name.replace("%kullanıcı%", member.displayName).
                member.setNickname(newNickname)
            } catch{}
        }

    })
}