module.exports = (client, Tags, Embed) => {

    client.on("message", async message => {
        if (message.author.bot || message.webhookID) return;

        const tag = await Tags.findOne({ where: { guild_id: message.guild.id } });
        if(tag.get("link_protect_enabled")){

            const possibleLinks = [".com", ".tv", ".net", ".xyz", ".io", ".me", ".gg", "www.", "http", ".org", ".biz", ".party", ".rf.gd", ".az"];
            possibleLinks.some(word => {
                if(message.content.toLowerCase().includes(word)){
                    
                    message.delete();
                    return message.channel.send(Embed("Link Engelleme", `${message.author} Gönderdiğin Mesaj Link İçerdiği İçin Mesajın Silindi.`, "error"));

                }
            });

        }
    })

}