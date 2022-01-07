const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args, lang, data) => { 
    const getLang = require(`../../lang/${lang}`)

    const HelpEmbed = new Discord.MessageEmbed()
    .setTitle(getLang.help.title)
    .addField(`🏹 Général`, "`help`, `create-embed`, `suggest`", false)
    .addField(`${getLang.help.configurator}`, "`setprefix`, `setlang`, `setwelcome`, `setgoodbye`, `setsuggest`, `setlog`", false)
    .addField(`${getLang.help.moderator}`, "`nuke`, `say`, `clear`")
    .addField(`${getLang.help.giveaway}`, `Indefined`, false)
    .addField(`${getLang.help.economy}`, "`mymoney`, `work`", false)
    .addField(`${getLang.help.funny}`, "`pileorface`", false)
    .setColor("RANDOM")
    .setFooter(cfg.bot.footer)

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
          .setLabel('Add Bot')
          .setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=905922365077225523&permissions=8&scope=bot')
      );
    
        message.channel.send({embeds: [HelpEmbed], components: [row]})
}

module.exports.help = {
    name: `help`,
    aliases: ['h', 'a', 'aide'],
    category: "general",
    descriptionfr: "Voir toutes les commandes disponible",
    descriptionen: "Show all command",
    usage: "`.help`",
    botPermissions: [],
    userPermissions: [],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}