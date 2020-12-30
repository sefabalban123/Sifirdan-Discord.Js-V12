module.exports = {
    name: "ping",
    description: "Botun Pingini Gönderir.",
    category: "Genel",
    aliases: ["p", "pi"],
    cooldown: 5,
    execute(message, args, Embed){
        const discordPing = message.client.ws.ping;

        message.channel.send(Embed("", "Ping Hesaplanıyor...")).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(Embed("", `Discord Gecikmesi: ${discordPing} ms\nBot Gecikmesi: ${ping} ms`));
        })
    }
}