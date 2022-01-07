const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")
const resolver = require("../../helpers/resolvers")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args[0];
    const getLang = require(`../../lang/${lang}`)

    if(!content){
        error.noArgs(message, lang, `\`${data.guild.prefix}setlog <channel>\``);
    }
    if(content){

        if(content.includes("<#")){

            let firstChannel = content.replace("<#", "");
            let channelID = firstChannel.replace(">", "");

            data.guild.logs = channelID;
            await data.guild.save();

            message.channel.send(getLang.setlogs.succes.replace(/{channel}/g, `<#${channelID}>`).replace(/{emoji.succes}/g, cfg.emojis.animated.succes))
        }else if(!content.includes("<#")){
            error.noArgs(message, lang, `\`${data.guild.prefix}setlog <channel>\``);
        }
    }
}

module.exports.help = {
    name: `setlog`,
    aliases: ['setlogs', 'logset'],
    category: "configuration",
    descriptionfr: "Définir le salon des logs",
    descriptionen: "define a logs channel ",
    usage: "`.setlang <channel>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}