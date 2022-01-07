const cfg = require("../config.json");
const Discord = require("discord.js")
//const Canvas = require("discord-canvas")
const welimg = ('../img/welcome.jpg')

module.exports = async (client, member) => {

  const guild = member.guild
  let guildData = await client.mongo.fetchGuild(guild.id);

  /*const image = await new Canvas.Welcome()
  .setUsername(member.user.usernamer)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(member.guild.memberCount)
  .setGuildName(member.guild.name)
  .setAvatar(member.user.displayAvatarURL({ format: "jpg"}))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground('https://cdn.discordapp.com/attachments/833637023914393631/908512713611812914/welcome.jpg')
  .toAttachment();
 
const goodbyeimg = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png")*/

  if(guildData.addons.welcome.enabled == true){
    if(!isNaN(guildData.addons.welcome.channel)){
      channels = client.channels.cache.get(guildData.addons.welcome.channel)

      messages = guildData.addons.welcome.message.replace(/{user}/g, member.user).replace(/{user_name}/g, member.user.username).replace(/{server_name}/g, guild.name).replace(/{server_membercount}/g, guild.memberCount)
      
      channels.send(messages)
    }
  }

  if(guildData.logs != "undefined"){
    if(!isNaN(guildData.logs)){

        desc = `**User Join**\n \n\`user: ${member.user.tag}\` \n \`user ID: ${member.user.id}\` \n\`\`\`Account Created At: ${member.user.createdAt} \`\`\``

      const joined = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(desc)

      const channels = client.channels.cache.get(guildData.logs)
      channels.send({ embeds: [joined] })
    }
  }
};