const { owner_guild_id } = require('../config.json')

module.exports = (message, name) => {
    const ownerGuild = message.client.guilds.cache.get(owner_guild_id);
    const emojiCol = ownerGuild.emojis.cache.find(emoji => emoji.name == name);

    const emoji = `<:${emojiCol.name}:${emojiCol.id}>`
    return emoji;
}