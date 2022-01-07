const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 
    const getLang = require(`../../lang/${lang}`)

    let member = message.mentions.members.first() ;

    if(!member) return error.noArgs(message, lang, `\`${data.guild.prefix}ban <user> [reason]\``);

    if(!member.bannable) return message.channel.send(getLang.ban.noBannable);
    if(member.permissions.has(Discord.Permissions.FLAGS[ "ADMINISTRATOR" ])) return message.channel.send(getLang.ban.noBannable);

    let reason = args.slice(1).join(" ")

    if(!reason){
        reason = "No Reason"
    }

    message.channel.send(getLang.ban.succes.replace(/{usertag}/g, member.user.tag).replace(/{reason}/g, reason));

    member.send(getLang.ban.banned.replace(/{server}/g, member.guild).replace(/{reason}/g, reason));
    member.ban({reason: reason})

}

module.exports.help = {
    name: `ban`,
    aliases: [],
    category: "moderator",
    descriptionfr: "Ban un utilisateur",
    descriptionen: "Ban a user",
    usage: "`.ban <user> [reason]`",
    botPermissions: [],
    userPermissions: [ "BAN_MEMBERS" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}