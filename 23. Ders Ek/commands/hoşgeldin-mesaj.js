const { prefix } = require('../config.json');

module.exports = {
    name: "hoşgeldin-mesaj",
    description: "Sunucuya Katılan Oyuncular İçin Hoş\nGeldiniz Mesajı Gönderir.",
    cooldown: 3,
    guildOnly: true,
    category: "Yetkili",
    aliases: ['hm'],
    async execute(message, args, Embed, Discord, Tags, tag) {
        
        const data = tag.get("welcome_message");

        if(args[0] == "kanal"){
            const mentionedChannel = message.mentions.channels.first();
            if(!mentionedChannel) return message.channel.send(Embed("", "Lütfen Bir Kanal Etiketleyiniz.", "info"))

            data.channel_id = mentionedChannel.id;

            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})
        }
        else if(args[0] == "mesaj"){
            const text = args.splice(1, args.length-1).join(" ");
            if(!text) return message.channel.send(Embed("", "Lütfen Bir Mesaj Giriniz.", "info"))

            data.message = text;

            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})
        }
        else if(args[0] == "aktif"){
            data.enabled = true;
            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})

            return message.channel.send(Embed("", "Hoşgeldiniz Mesajı Başarıyla Aktifleştirild.i"))
        }
        else if(args[0] == "pasif"){
            data.enabled = false;
            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})

            return message.channel.send(Embed("", "Hoşgeldiniz Mesajı Başarıyla Pasifleştirildi."))
        }
        else{
            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Hoş Geldiniz Mesajı")
                .setColor("#e9ffa")
                .setDescription("Bu Komutu Kullanarak Hoş Geldiniz Mesajları Oluşturabilirsiniz.")
                .addFields(
                    {name: `Gereken Yetki:`, value: "Yönetici", inline: true},
                    {name: `Aktiflik Durumu:`, value: "Aktif", inline: true},
                    {name: `${prefix}hoşgeldiniz-mesaj aktif`, value: "Hoş Geldiniz Mesajını Aktifleştirir"},
                    {name: `${prefix}hoşgeldiniz-mesaj pasif`, value: "Hoş Geldiniz Mesajını Pasifleştirir."},
                    {name: `${prefix}hoşgeldiniz-mesaj mesaj <mesaj>`, value: "Hoş Geldiniz Mesajını Belirler."},
                    {name: `${prefix}hoşgeldiniz-mesaj kanal #kanal`, value: "Hoş Geldiniz Mesajı Kanalını Belirler."}
                )
            
            message.channel.send(infoEmbed);
        }
    }
}