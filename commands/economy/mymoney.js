const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args.join(" ");
    const getLang = require(`../../lang/${lang}`)

    const money_embed = new Discord.MessageEmbed()
    .setTitle(getLang.economy.mymoney.title.replace(/{user}/g, message.author.tag))
    .setDescription(getLang.economy.mymoney.desc.replace(/{money}/g, data.member.money).replace(/{bank}/g, data.member.bank).replace(/{logomoney}/g, data.guild.addons.economy.defaultMoneyIcon))
    .setFooter(cfg.bot.footer)
    .setColor("RANDOM")

    message.channel.send({ embeds: [money_embed] })
}

module.exports.help = {
    name: `mymoney`,
    aliases: ['money', 'bank'],
    category: "economy",
    descriptionfr: "Connaitre vos richesse actuelle",
    descriptionen: "Know your current wealth",
    usage: "`.mymoney`",
    botPermissions: [],
    userPermissions: [],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}