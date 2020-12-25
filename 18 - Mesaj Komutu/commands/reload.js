module.exports = {
    name: "reload",
    aliases: ['r'],
    execute(message, args, client, Embed) {

        if (!args.length) return message.channel.send(Embed("", "Lütfen Bir Komut Adı Giriniz.", "info"));

        const commandName = args[0];
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(Embed("", `${commandName} Adında Bir Komut Bulunamadı!`, "error"));

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try{
            const newCommand = require(`./${command.name}`);
            client.commands.set(command.name, newCommand);
            message.channel.send(Embed("", `\`${command.name}\` Adlı Komut Başarıyla Yenilendi.`))
        }
        catch(e){
            message.channel.send(Embed("", `\`${command.name}\` Adlı Komut Yenilenirken Bir Hata Oluştu!`, "error"));
            console.error(e);
        }

    }
}