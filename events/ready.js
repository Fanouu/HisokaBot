const cfg = require("../config.json");
const Discord = require("discord.js")

module.exports = client => {

    channelID = "833636836471472128";
    msgChannel = client.channels.cache.get(channelID);

   /* const embed = new Discord.MessageEmbed()
    .setTitle("Hisoka - statut")
    .setDescription(`*=================* \n**${client.user.username} is ready** ! (||${client.user.id}||) \nAt **\`${client.guilds.cache.size}\` guilds** \n*=================*`)
    .setFooter(cfg.bot.footer)
    .setColor("RED")

    msgChannel.send({embeds: [embed]});*/

    console.log(`================= \n${client.user.username} is ready ! (${client.user.id}) \nAt ${client.guilds.cache.size} guilds \n=================`)

    let commandCount = client.commands.size;

    let jeuxs = [
        `.help | ${client.guilds.cache.size} serveurs`,
        `.help | ${client.users.cache.size} personnes`,
        `.help | ${client.channels.cache.size} channels`,
        `.help | ${client.guilds.cache.size} serveurs`
        ];
let index = 0
setInterval(() => {
        const activities_list = [
            ".help | " + client.users.cache.size + " utilisateurs š¤",
            ".help | " + commandCount + " commands š",
            ".help | v " + cfg.bot.version + " š» ",
            ".help | website is work š"

        ];

        client.user.setPresence({activities: [{name: activities_list[index], type: "WATCHING"}], status: 'idle'})
        index++
        if (index > (activities_list.length - 1)) index = 0

    }, 7000);
    
    setInterval(() => {
      
      async function stats(){
      let channelss = client.channels.cache.get("833636836471472128")
    let status = await channelss.messages.fetch("908466730328805406")
    
    const statut = new Discord.MessageEmbed()
    .setTitle("Status of Hisoka")
    .setDescription(`š„ **Users:** ${client.users.cache.size} \n **Servers:** ${client.guilds.cache.size} \nš **Commands:** ${commandCount} \nš **Website:** https://hisokabot.tk`)
    .setFooter(cfg.bot.footer)
    .setColor("RED")
    
    status.edit({ embeds: [statut] })
      } 
      
      stats()
    }, 10000)
};