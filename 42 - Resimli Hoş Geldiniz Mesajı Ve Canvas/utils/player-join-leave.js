const Canvas = require("canvas");

module.exports = (client, Tags, Embed, Discord) => {

    // Player Join
    client.on('guildMemberAdd', async member => {

        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } });
        const data = tag.get("welcome_message");

        if (data.enabled) {
            const channel = member.guild.channels.cache.get(data.channel_id);
            if (!channel) return;
            const text = data.message.replace('%kullanıcı%', member.displayName).replace("%toplam_üye%", member.guild.memberCount);

            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext("2d");

            const background = await Canvas.loadImage("images/welcome.jpg");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Border
            ctx.strokeStyle = "#f0f0f0";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Text
            ctx.font = "36px Sans-serif";
            ctx.fillStyle = "#f0f0f0";
            ctx.fillText("Sunucuya Hoş Geldin", 275, 110);

            // Text 2
            ctx.font = "32px Sans-serif";
            ctx.fillStyle = "#f0f0f0";
            ctx.fillText(member.displayName, canvas.width / 1.55 - (ctx.measureText(member.displayName).width / 2), 150);

            // Avatar circle
            ctx.beginPath()
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
            ctx.closePath();
            ctx.clip();

            // Avatar
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }))
            ctx.drawImage(avatar, 25, 25, 200, 200);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.jpg")

            channel.send(text, attachment);
        }
    })

    // Player Leave
    client.on('guildMemberRemove', async member => {

        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } });
        const data = tag.get("leave_message");

        if (data.enabled) {
            const textChannel = member.guild.channels.cache.get(data.channel_id);
            if (!textChannel) return

            const text = data.message.replace('%kullanıcı%', member.displayName).replace("%toplam_üye%", member.guild.memberCount);
            textChannel.send(Embed("", text));
        }

    })

}