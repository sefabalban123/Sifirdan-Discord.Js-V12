module.exports = {
    name: "sunucuavatar",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, client, Embed, Discord){

        const guildIcon = message.guild.iconURL({dynamic: true, size: 256, format: 'png'});
        
        if(guildIcon == null) return message.channel.send(Embed("", "Bu Sunucunun Bir Avatarı Yok!", "error"))

        return message.channel.send(guildIcon);

    }
}