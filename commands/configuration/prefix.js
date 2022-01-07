const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args.join(" ");

    if(!content){
        error.noArgs(message, lang, `\`${data.guild.prefix}setprefix <prefix>\``);
    }
    if(content){
        data.guild.prefix = content;
        await data.guild.save();
        message.channel.send(`le prefix a bien été changer pour \`${data.guild.prefix}\``);
    }
}

module.exports.help = {
    name: `setprefix`,
    aliases: ['prefix', 'prefixset', 'settingprefix'],
    category: "configuration",
    descriptionfr: "Définir un préfix pour le server",
    descriptionen: "Set a spécific server prefix",
    usage: "`.setprefix <prefix>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}