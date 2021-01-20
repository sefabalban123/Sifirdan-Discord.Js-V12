module.exports = async (message, Tags, Embed) => {

    const tag = await Tags.findOne({ where: { guild_id: message.guild.id } });
    if (tag.get("link_protect_enabled")) {

        const possibleLinks = [".com", ".tv", ".net", ".xyz", ".io", ".me", ".gg", "www.", "http", ".org", ".biz", ".party", ".rf.gd", ".az"];
        possibleLinks.some(word => {
            if (message.content.toLowerCase().includes(word)) {

                message.delete()
                    .then(() => {
                        return message.channel.send(Embed("Link Engelleme", `${message.author} Gönderdiğin Mesaj Link İçerdiği İçin Mesajın Silindi.`, "error"));
                    })
                    .catch(() => { });
            }
        });

    }

}