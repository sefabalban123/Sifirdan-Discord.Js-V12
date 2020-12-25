module.exports = {
    name: "sil",
    cooldown: 5,
    guildOnly: true,
    permission: 'MANAGE_MESSAGES',
    execute(message, args, client, Embed){

        const sayi = parseInt(args[0]);
        if(isNaN(sayi)) return message.channel.send(Embed("", "Lütfen 2-100 Arası Bir Sayı Girin.", "info"));

        if(sayi < 1 || sayi > 99) return message.channel.send(Embed("", "Silinecek Mesaj Sayısı En Az 2, En Fazla 100 Olabilir.", "error"));

        message.channel.bulkDelete(sayi+1, false).then(() => {
            return message.channel.send(Embed("", `${sayi} Adet Mesaj Başarıyla Temizlendi.`))
        })
        .catch(() => {
            return message.channel.send(Embed("", "14 Günden Eski Mesajlar Silinemez.", "error"));
        })

    }
}