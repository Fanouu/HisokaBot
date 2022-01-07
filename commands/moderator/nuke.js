const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 
    const getLang = require(`../../lang/${lang}`)

    const channel = await message.channel.clone()
    channel.setPosition(message.channel.position)

    message.channel.delete()

    channel.send(getLang.nuke.succes.replace(/{emoji.succes}/g, cfg.emojis.animated.succes))

}

module.exports.help = {
    name: `nuke`,
    aliases: [],
    category: "moderator",
    descriptionfr: "Nuke le salon",
    descriptionen: "Nuke a channel",
    usage: "`.nuke`",
    botPermissions: [],
    userPermissions: [ "MANAGE_MESSAGES" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}