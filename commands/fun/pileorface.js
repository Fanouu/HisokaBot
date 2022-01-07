const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 
    const getLang = require(`../../lang/${lang}`)

    
        const random = [ "pile", "face" ];

    let result = random[Math.floor((Math.random() * random.length))];

    const messagess = await message.channel.send(getLang.pileorface.answer);
    messagess.react('1️⃣')
    messagess.react('2️⃣')

    const filter = (reaction, user) => {
    return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    messagess.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] }).then(collected => {

    	const reaction = collected.first().emoji.name

    	if(collected.first().emoji.name == '1️⃣' && result === "pile"){
    		if(lang == 'fr'){
                message.channel.send(`:trophy: **Bravo !** \n Quel chance, la pièce est tombée sur **pile** et tu a joué **pile** !!`)
            }else if(lang == 'en'){
            	message.channel.send(`:trophy: **Congratulations !** \n Luckily, the coin fell on **pile** and you played **pile** !!`)
            }
        }

        if(collected.first().emoji.name == '2️⃣' && result === "face"){
        	if(lang == 'fr'){
                message.channel.send(`:trophy: **Bravo !** \n Quel chance, la pièce est tombée sur **face** et tu a joué **face** !!`)
            }else if(lang == 'en'){
            	message.channel.send(`:trophy: **Congratulations !** \n Luckily, the coin fell on **face** and you played **face** !!`)
            }
        }

        if(collected.first().emoji.name == '2️⃣' && result === "pile"){
        	if(lang == 'fr'){
                message.channel.send(`:no_entry: **Dommage ...** \n Ré-essaye encore, la pièce est tombée sur *pile* et tu a joué *face*.`)
            }else if(lang == 'en'){
            	message.channel.send(`:no_entry: **too bad ...** \n Try again, the piece fell on *pile* and you played *face*.`)
            }
        }

        if(collected.first().emoji.name == '1️⃣' && result === "face"){
        	if(lang == 'fr'){
                message.channel.send(`:no_entry: **Dommage ...** \n Ré-essayé encore, la pièce est tombée sur *face* et tu a joué *pile*.`)
            }else if(lang == 'en'){
            	message.channel.send(`:no_entry: **too bad ...** \n Try again, the piece fell on *face* and you played *pile*.`)
            }
        }
    }).catch(() => {
        message.reply('No reaction after 60 seconds, operation canceled');
    });

}

module.exports.help = {
    name: `pileorface`,
    aliases: ['pof'],
    category: "fun",
    descriptionfr: "Joué a pile ou face avec le bot",
    descriptionen: "Playing pile or face with bot",
    usage: "`.pileorface`",
    botPermissions: [],
    userPermissions: [],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}