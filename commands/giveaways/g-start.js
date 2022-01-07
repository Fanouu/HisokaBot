const Discord = require("discord.js");
const ms = require("ms")
const error = require("../../utils/error");
const cfg = require("../../config.json");



module.exports.run = async (client, message, args, prefixes, lang, data) => { 

    try{

        let giveawayChannel = message.mentions.channels.first();
 
        if(!giveawayChannel) return error.noArgs(message, lang, `\`${data.guild.prefix}g-start <channel> <time> <winner-count> <prize>\``);


    let giveawayDuration = args[1];
  
    if(!giveawayDuration || isNaN(ms(giveawayDuration)))return error.noArgs(message, lang, `\`${data.guild.prefix}g-start <channel> <time> <winner-count> <prize>\``);

    let giveawayNumberWinners = args[2];
    
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0))return error.noArgs(message, lang, `\`${data.guild.prefix}g-start <channel> <time> <winner-count> <prize>\``);

  
    let giveawayPrize = args.slice(3).join(' ');
 
    if(!giveawayPrize) return error.noArgs(message, lang, `\`${data.guild.prefix}g-start <channel> <time> <winner-count> <prize>\``);
    
        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            duration: ms(giveawayDuration),
            startAt: Date.now(),
            endAt: Date.now() + ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: parseInt(giveawayNumberWinners),
            // Who hosts this giveaway
            hostedBy: cfg.hostedBy ? message.author : null,
            // Messages
            messages: {
            giveaway: (cfg.everyoneMention ? "\n\n" : "")+"<a:gws:908632922070843412> **GIVEAWAY**",
            giveawayEnded: (cfg.everyoneMention ? "\n\n" : "")+"<a:gws:908632922070843412> **GIVEAWAY FINI**",
            drawing: "Time Left: **{timestamp}**!",
            inviteToParticipate: "React with 🎁 to participate!",
            winMessage: "Bravo!, {winners}! you won **{prize}**!",
            embedFooter: "{this.winnerCount} winner(s)",
            noWinner: "Giveaway ended!, No winner(s).",
            hostedBy: "Hosted by: {this.hostedBy}",
            endedAt: 'Ended at',
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false 
            }
        }
        });

    }catch(error){
        let fan = client.users.cache.get("853586002576408587");
        fan.send("**__Erreur:__** " + error.stack);
      
    }
}   

module.exports.help = {
    name: `g-start`,
    aliases: ['gstart'],
    category: "giveaways",
    descriptionfr: "Lancer un giveaway",
    descriptionen: "Ask an question to the bot",
    usage: "`.g-start <salon> <durée> <winners> <prix>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}