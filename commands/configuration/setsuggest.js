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
        error.noArgs(message, lang, `\`${data.guild.prefix}setsuggest <channel>\``);
    }
    if(content){

        if(content.includes("<#")){

            let firstChannel = content.replace("<#", "");
            let channelID = firstChannel.replace(">", "");

            data.guild.suggest = channelID;
            await data.guild.save();

            message.channel.send(getLang.setsuggest.succes.replace(/{channel}/g, `<#${channelID}>`).replace(/{emoji.succes}/g, cfg.emojis.animated.succes))
        }else if(!content.includes("<#")){
            error.noArgs(message, lang, `\`${data.guild.prefix}setsuggest <channel>\``);
        }
    }
}

module.exports.help = {
    name: `setsuggest`,
    aliases: ['settingsuggest'],
    category: "configuration",
    descriptionfr: "Définir le salon des suggestion",
    descriptionen: "define a suggest channel ",
    usage: "`.setlang <channel>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}