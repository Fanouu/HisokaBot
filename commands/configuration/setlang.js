const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args.join(" ");

    if(!content){
        error.noArgs(message, lang, `\`${data.guild.prefix}setlang <en/fr>\``);
    }
    if(content){
switch (content) {
          case 'fr':
            
            const embedfr = new Discord.MessageEmbed()
            .setDescription(":flag_fr: *-* **FR** \n **The language has been saved to \`fr\` !**")
            .setColor("RED")

            data.guild.lang = "fr";
            await data.guild.save();
            message.channel.send({ embeds: [embedfr]})
            break;
          
          case 'en':
            const embeden = new Discord.MessageEmbed()
            .setDescription(":flag_au: *-* **EN** \n **La langue a été sauvegardée sur \`en\` !**")
            .setColor("RED")
            
            data.guild.lang = "en";
            await data.guild.save();
            message.channel.send({ embeds: [embeden]})
            break;
          
        }
    }
}

module.exports.help = {
    name: `setlang`,
    aliases: ['lang', 'langset'],
    category: "configuration",
    descriptionfr: "Définir la lang par défaut sur le server",
    descriptionen: "define a default language ",
    usage: "`.setlang <en/fr>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}