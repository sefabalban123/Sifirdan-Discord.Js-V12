module.exports = (client, Tags, Embed) => {

    const inviteCheck = async (guild, code) => {
        return await new Promise((resolve) => {
            guild.fetchInvites().then(invites => {
                for (const invite of invites) {
                    if (code == invite[0]) {
                        resolve(true);
                        return
                    }
                }

                resolve(false);
            })
        })
    }

    client.on("message", async message => {

        if (message.author.bot || message.webhookID) return;

        const tag = await Tags.findOne({ where: { guild_id: message.guild.id } });

        if (tag.get("advertise_protect_enabled") && !message.member.hasPermission("ADMINISTRATOR")) {

            if (message.content.includes("discord.gg/")) {

                const code = message.content.split("discord.gg/")[1];

                const isOurInvite = await inviteCheck(message.guild, code);

                if (!isOurInvite) {
                    message.delete();
                    return message.channel.send(Embed("", `${message.author} Reklam Yaptığın İçin Mesajın Silindi!`, "error"))
                }
            }

        }

    })

}