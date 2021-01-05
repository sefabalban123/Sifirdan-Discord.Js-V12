const Discord = require('discord.js');

module.exports = (title, description, color = "#a6ffc2") => {
    const Embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)

    let newColor = "";
    if(color == "error") newColor = "#ff7d7d"
    else if (color == "info") newColor = "#e9ffa"

    if(newColor == "") Embed.setColor(color)
    else Embed.setColor(newColor)
    
    return Embed;
}