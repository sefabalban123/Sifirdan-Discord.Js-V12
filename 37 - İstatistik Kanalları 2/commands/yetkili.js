module.exports = {
    name: "yetkili",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, Embed, Discord, Tags, tag){

        const prefix = tag.get("prefix");

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("🔻 Yetkili Komutları")
            .setColor("#a6ffc2")
        
        message.client.commands.forEach(command => {
            if(command.category == "Yetkili"){
                infoEmbed.addField(`${prefix}${command.name}`, `\n\u200b${command.description}`);
            }
        })

        return message.channel.send(infoEmbed);

    }
}