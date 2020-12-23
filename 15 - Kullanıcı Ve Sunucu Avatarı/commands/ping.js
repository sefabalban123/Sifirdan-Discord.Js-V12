module.exports = {
    name: "ping",
    aliases: ["p", "pi"],
    cooldown: 5,
    execute(message, args, client, Embed){
        const discordPing = message.client.ws.ping;

        message.channel.send(Embed("", "Ping Hesaplanıyor...")).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(Embed("", `Discord Gecikmesi: ${discordPing} ms\nBot Gecikmesi: ${ping} ms`));
        })
    }
}