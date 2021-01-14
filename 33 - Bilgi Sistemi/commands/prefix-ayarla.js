module.exports = {
    name: "prefix-ayarla",
    category: "Yetkili",
    description: "Botun Prefixini Değiştirmeye Yarar.",
    cooldown: 5,
    guildOnly: true,
    aliases: ["prefixayarla", "payarla"],
    async execute(message, args, Embed, Discord, Tags, tag) {

        if (!args[0]) return message.channel.send(Embed("", "Lütfen Yeni Prefixi Giriniz.", "info"));
        if (args[0].length > 5) return message.channel.send(Embed("", "Prefix Uzunluğu En Fazla 5 Olabilir.", "info"));

        await Tags.update({ prefix: args[0] }, { where: { guild_id: message.guild.id } });
        return message.channel.send(Embed("", `Prefix Başarıyla \`${args[0]}\` Olarak Ayarlandı.`));


    }
}