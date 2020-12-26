const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { token, prefix, developer_id } = require('./config.json');

// Utils
const Embed = require('./utils/embed.js');
const playerJoinLeave = require('./utils/player-join-leave');

// Collections
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
})

// Event Handlers
client.once('ready', () => {
    console.log("Bot Çalıştırıldı!");

    client.user.setActivity("YouTube Test Botu");

    // Utils
    playerJoinLeave(client, Discord);
})

client.on('message', (message) => {

    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!message.content.startsWith(prefix) || !command) return;

    // Guild Control
    if (command.guildOnly && message.channel.type == "dm") return message.channel.send(Embed("", "Bu Komut Yalnızca Sunucularda Çalışabilmektedir!", "error"));

    // Permission Control
    if (command.permission && !message.member.hasPermission(command.permission)) return message.channel.send(Embed("", "Bu Komutu Kullanmak İçin Gereken Yetkiye Sahip Değilsin.", "error"));

    // Developer Only Commands
    if (command.developerOnly && message.author.id != developer_id) return;

    // Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const timestamps = cooldowns.get(command.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (expirationTime > now) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(Embed("", `Bu Komutu Tekrar Kullanmak İçin Lütfen ${parseInt(timeLeft)} Saniye Bekleyin.`, "#91cfff"));
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id);
    }, cooldownAmount);

    try {
        command.execute(message, args, Embed, Discord);
    }
    catch (e) {
        console.error(e);
        message.channel.send(Embed("", "Bu Komut Çalıştırılırken Bir Hata Oldu!", "error"));
    }
})

client.login(token);