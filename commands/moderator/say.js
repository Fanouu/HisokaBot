const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const sayMessage = args.join(" ");
    
    if(!sayMessage) return error.noArgs(message, lang, `\`${data.guild.prefix}say <message>\``);

    if(sayMessage)
    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
}

module.exports.help = {
    name: `say`,
    aliases: ['s'],
    category: "moderator",
    descriptionfr: "Envoyer un message via le bot",
    descriptionen: "Say a messsage with bot",
    usage: "`.say <message>`",
    botPermissions: [],
    userPermissions: [ "MANAGE_MESSAGES" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}