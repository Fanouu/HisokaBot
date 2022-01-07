const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = args.join(" ");
    const getLang = require(`../../lang/${lang}`)

    if(!content){
        const noArgsEmbed = new Discord.MessageEmbed()
        .setTitle(getLang.setgoodbye.noargsembed.title)
        .setDescription(getLang.setgoodbye.noargsembed.desc.replace(/{prefix}/g, data.guild.prefix))
        .setFooter(cfg.bot.footer)
        .setColor("RED")

        message.channel.send({embeds:[noArgsEmbed]})
    }
    if(content){
switch (content) {
          case 'setting':
            const embed1 = new Discord.MessageEmbed()
            .setTitle(getLang.setgoodbye.setting.embed1.title)
            .setDescription(getLang.setgoodbye.setting.embed1.desc)
            .setFooter(cfg.bot.footer)

            message.channel.send({embeds:[embed1]})

            const filter = (m) => m.author.id === message.author.id;
            const opt = { filter, max: 1, time: 120000, errors: [ "time" ] };

            const collected = await message.channel.awaitMessages(opt).catch(() => {})

            if(!collected || !collected.first()) return message.channel.send("Vous avez pris trop de temp !")

            const msg = collected.first().content;

            if(!msg.includes("<#") && !msg === "cancel") return message.channel.send(`**\`${msg}\` n\'est pas un salon, merci de donné la mention du salon exact ! Veillez re-commencer la configuration:** \`${data.guild.prefix}setgoodbye setting\``)

            if(msg === "cancel") return message.channel.send("**exit succesfully** !")

            const embed2 = new Discord.MessageEmbed()
            .setTitle(getLang.setgoodbye.setting.embed2.title)
            .setDescription(getLang.setgoodbye.setting.embed2.desc)
            .setFooter(cfg.bot.footer)

            message.channel.send({embeds:[embed2]})


            const collected2 = await message.channel.awaitMessages(opt).catch(() => {});

            if(!collected2 || !collected2.first()) return message.channel.send("Vous avez pris trop de temp !")

            const msg2 = collected2.first().content;

            if(msg2 === "cancel") return message.channel.send("**exit succesfully** !")

            const embed3 = new Discord.MessageEmbed()
            .setTitle(getLang.setgoodbye.setting.embed3.title)
            .setDescription(getLang.setgoodbye.setting.embed3.desc)
            .setFooter(cfg.bot.footer)

            message.channel.send({embeds:[embed3]})

            const collected3 = await message.channel.awaitMessages(opt).catch(() => {});
    
            if(!collected3 || !collected3.first()) return message.channel.send("Vous avez pris trop de temp !")

            let msg3 = collected3.first().content;

            if(!msg3 === "no" && !msg3 === "yes" && !msg === "cancel") return message.channel.send(`**\`${msg3}\` n\'est pas accepté, merci de préciser par \`yes\` ou \`no\` ! Veillez re-commencer la configuration:** \`${data.guild.prefix}setwelcome setting\``)
    
            if(msg3 === "cancel") return message.channel.send("**exit succesfully** !")

            if(lang == 'fr'){
                succes = `${cfg.emojis.animated.succes} **La configuration des messages d'au-revoir est terminé !**`
            }else if(lang == 'en'){
                succes = `${cfg.emojis.animated.succes} **Goodbye messages setup is complete !**`
            }   

            message.channel.send(succes)

            let firstChannel = msg.replace("<#", "");
            let channelID = firstChannel.replace(">", "");

            data.guild.addons.goodbye = { enabled: true, channel: channelID, message: msg2, image: msg3, embed: false }
            data.guild.markModified('addons.goodbye');
            await data.guild.save();
            
            break;
          
          case 'currentsetting':

            const currentdesc = getLang.setgoodbye.currentsetting.desc.replace("{current_channel}", `<#${data.guild.addons.goodbye.channel}>`).replace("{current_message}", data.guild.addons.goodbye.message).replace("{current_image}", data.guild.addons.goodbye.image).replace("{current_enable}", data.guild.addons.goodbye.enabled)

            const current = new Discord.MessageEmbed()
            .setTitle(getLang.setgoodbye.currentsetting.title.replace("{server}", message.guild.name))
            .setDescription(currentdesc)
            .setFooter(cfg.bot.footer)
            

            message.channel.send({ embeds: [current]})
            break;

          case 'on':

            data.guild.addons.goodbye.enabled = true;
            data.guild.markModified('addons.goodbye');
            await data.guild.save();

            message.channel.send(getLang.setgoodbye.succes.on)

            break;

          case 'off':
            data.guild.addons.goodbye.enabled = false;
            data.guild.markModified('addons.goodbye');
            await data.guild.save();

            message.channel.send(getLang.setgoodbye.succes.off)

            break;
          
        }
    }
}

module.exports.help = {
    name: `setgoodbye`,
    aliases: ['goodbye', 'goodbyeset'],
    category: "configuration",
    descriptionfr: "Définir un message de leave",
    descriptionen: "define a goodbye message ",
    usage: "`.setgoodbye`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}