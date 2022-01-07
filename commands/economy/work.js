const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args.join(" ");
    const getLang = require(`../../lang/${lang}`)

    const timed = 3600000;
    const usertime = data.member.addons.cooldown.work

    if(usertime !== 0 && timed - (Date.now() - usertime) > 0){

        const roundTowardsZero = timed - (Date.now - usertime) > 0 ? Math.floor : Math.ceil;
        const timedate = Date.now() - usertime

        let hours = roundTowardsZero(timed - timedate / 3600000) % 24;
        let minutes = roundTowardsZero(timed - timedate / 60000) % 60;
        let seconds = roundTowardsZero(timed - timedate / 1000) % 60;

        const embed_error = new Discord.MessageEmbed()
        .setDescription(getLang.economy.work.errortime.title.replace(/{hours}/g, hours).replace(/{minute}/g, minutes).replace(/{second}/g, seconds))
        .setFooter(cfg.bot.footer)
        .setColor("RED")

        message.channel.send({ embeds: [embed_error] })
    }else{

        if(lang == 'fr'){
            metier = ['Développeur','Maçon','Pompier','Policié','Caissier','Cuisinier']
        }else if(lang == 'en'){
            metier = ['Developer','Mason','Firefighter','Policie','Cashier','Cook']
        }

        let result = Math.floor((Math.random() * metier.length));
        let amount = Math.floor(Math.random() * 150) + 1;

        const embed_succes = new Discord.MessageEmbed()
        .setDescription(getLang.economy.work.succes.title.replace(/{worker}/g, metier[result]).replace(/{iconlogo}/g, data.guild.addons.economy.defaultMoneyIcon).replace(/{gain}/g, amount))
        .setFooter(cfg.bot.footer)
        .setColor("GREEN")

        message.channel.send({ embeds: [embed_succes] })

        data.member.money += parseInt(amount);
        await data.member.save();

        data.member.addons.cooldown.work = Date.now();
        data.member.markModified('addons.cooldown');
        await data.member.save();
    }
}

module.exports.help = {
    name: `work`,
    aliases: [],
    category: "economy",
    descriptionfr: "Travaillé et gagnez de l'argent",
    descriptionen: "Work and earn money",
    usage: "`.work`",
    botPermissions: [],
    userPermissions: [],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}