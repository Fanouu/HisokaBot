const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 
    const getLang = require(`../../lang/${lang}`)

    const amount = args.join(' ');
    message.delete();

    if(lang == 'fr'){
        noamount = `${cfg.emojis.animated.error} **Vous devez spécifier un nombre entre 1 et 100**`
        notANumber = `${cfg.emojis.animated.error} **\`${amount}\` n'est pas un un chiffres !**`
        succes = `${cfg.emojis.animated.succes} **\`${amount}\` message ont été supprimé**`
    }else if(lang == 'en'){
        noamount = `${cfg.emojis.animated.error} **You must specify a number between 1 and 100**`
        notANumber = `${cfg.emojis.animated.error} **\`${amount}\` is not a numbers !**`
        succes = `${cfg.emojis.animated.succes} **\`${amount}\` message was been cleared**`
    }

    if (!amount) return message.reply(noamount); 
    if (isNaN(amount)) return message.reply(notANumber);
        
    if (amount > 100) return message.channel.send(noamount); 
    if (amount < 1) return message.channel.send(noamount); 

    message.channel.bulkDelete(amount)
    message.channel.send(succes)



}

module.exports.help = {
    name: `clear`,
    aliases: ['delete'],
    category: "moderator",
    descriptionfr: "Supprime un certain nombre de message",
    descriptionen: "Deletes a number of messages",
    usage: "`.clear <number>`",
    botPermissions: [],
    userPermissions: [ "MANAGE_MESSAGES" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}