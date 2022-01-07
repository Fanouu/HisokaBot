const cfg = require("../config.json");
const Discord = require("discord.js")
//const Canvas = require("discord-canvas"),

module.exports = async (client, message) => {

  const guild = message.guild
  let guildData = await client.mongo.fetchGuild(message.guild.id);

  if(message.author.id != "905922365077225523"){
  if(guildData.logs != "undefined"){
    if(!isNaN(guildData.logs)){

        desc = `**Message Deleted**\n \n\`author: ${message.author.tag}\` \n\`channel:\` ${message.channel} \n \`\`\`message: ${message.content} \`\`\``

      const deleted = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setDescription(desc)

      const channels = client.channels.cache.get(guildData.logs)
      channels.send({ embeds: [deleted] })
    }
  }
  }
};