module.exports = {
    name: "yazı-tura",
    category: "Genel",
    description: "",
    cooldown: 4,
    async execute(message, args, Embed, Discord, Tags, tag, emojis){

        const msg = await message.channel.send(Embed("", "Yazı Tura Atılıyor..."))

        setTimeout(() => {
            msg.delete();

            // const attachment = new Discord.MessageAttachment("images/yazı.png");
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            let path = "";
            if(randomNumber <= 50){
                path = "images/yazı.png";
            }
            else{
                path = "images/tura.png";
            }
            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Test")

            const attachment = new Discord.MessageAttachment(path);
            message.channel.send(infoEmbed, attachment);


        }, 3000);

    }
}