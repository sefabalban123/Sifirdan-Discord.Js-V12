module.exports = (message, name) => {
    const emojiCol = message.guild.emojis.cache.find(emoji => emoji.name == name);

    const emoji = `<:${emojiCol.name}:${emojiCol.id}>`
    return emoji;
}