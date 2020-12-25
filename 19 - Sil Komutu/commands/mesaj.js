module.exports = {
    name: "mesaj",
    cooldown: 5,
    guildOnly: true,
    permission: "MANAGE_MESSAGES",
    execute(message, args, client, Embed, Discord){

        const channel = message.mentions.channels.first();
        if(!channel) return message.channel.send(Embed("", "Lütfen Bir Kanal Etiketleyiniz.", "info"));

        const text = args.splice(1, args.length-1).join(" ");
        if(!text) return message.channel.send(Embed("", "Lütfen Bir Mesaj Giriniz.", "info"));

        const infoEmbed = new Discord.MessageEmbed()
            .setColor("#aef7a3")
            .setDescription(text)
            .setFooter(`${message.member.user.username}#${message.member.user.discriminator}`, message.member.user.avatarURL({ dynamic: true, format: 'png', size: 256 }))

        channel.send(infoEmbed).then(msg => {
            message.delete();
        })
    }
}