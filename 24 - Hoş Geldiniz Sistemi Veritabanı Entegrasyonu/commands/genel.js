const { prefix } = require('../config.json');

module.exports = {
    name: "genel",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, Embed, Discord){

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("💬 Genel Komutlar")
            .setColor("#a6ffc2")
        
        message.client.commands.forEach(command => {
            if(command.category == "Genel"){
                infoEmbed.addField(`${prefix}${command.name}`, `\n\u200b${command.description}`);
            }
        })

        return message.channel.send(infoEmbed);

    }
}