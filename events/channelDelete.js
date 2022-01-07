const cfg = require("../config.json");
const Discord = require("discord.js")
//const Canvas = require("discord-canvas"),

module.exports = async (client, channel) => {

  const guild = channel.guild
  let guildData = await client.mongo.fetchGuild(channel.guild.id);

  if(guildData.logs != "undefined"){
    if(!isNaN(guildData.logs)){

        desc = `**Channel Deleted**\n \n\`channel:\` ${channel.name} \n \`\`\`channel ID: ${channel.id} \`\`\``

      const deleted = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setDescription(desc)

      const channels = client.channels.cache.get(guildData.logs)
      channels.send({ embeds: [deleted] })
    }
  }
};