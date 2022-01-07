const cfg = require("../config.json");
const Discord = require("discord.js")
//const Canvas = require("discord-canvas"),

module.exports = async (client, channel) => {

  const guild = channel.guild
  let guildData = await client.mongo.fetchGuild(channel.guild.id);

  if(guildData.logs != "undefined"){
    if(!isNaN(guildData.logs)){

        desc = `**Channel Created**\n \n\`channel:\` ${channel} \n \`\`\`channel ID: ${channel.id} \`\`\``

      const created = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(desc)

      const channels = client.channels.cache.get(guildData.logs)
      channels.send({ embeds: [created] })
    }
  }
};