const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")
const resolver = require("../../helpers/resolvers")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args.join(" ");
    const getLang = require(`../../lang/${lang}`)

    if(!content){
        error.noArgs(message, lang, `\`${data.guild.prefix}suggest <message>\``);
    }
    if(content){

        if(data.guild.suggest != "undefined"){
            if(!isNaN(data.guild.suggest)){

                const suggest = new Discord.MessageEmbed()
                .setTitle(getLang.suggest.title.replace(/{user}/g, message.author.tag))
                .setColor("GOLD")
                .setDescription(`\`\`\`${content}\`\`\``)
                .setTimestamp()

                const suggest_channel = client.channels.cache.get(data.guild.suggest)
                const suggest_message = await suggest_channel.send({ embeds: [suggest] })
                suggest_message.react('<a:succes:809091639300587530>')
                suggest_message.react('➖')
                suggest_message.react('<a:error:809091606908502077>')
            }
        }
    }
}

module.exports.help = {
    name: `suggest`,
    aliases: ['suggestion'],
    category: "general",
    descriptionfr: "Envoyé une suggestion",
    descriptionen: "Send a suggest ",
    usage: "`.suggest <message>`",
    botPermissions: [],
    userPermissions: [],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}