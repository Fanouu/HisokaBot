const cfg = require("../config.json");
const Discord = require("discord.js")
//const Canvas = require("discord-canvas"),

module.exports = async (client, member) => {

  const guild = member.guild
  let guildData = await client.mongo.fetchGuild(guild.id);

  /*const image = await new Canvas.Goodbye()
  .setUsername(member.user.usernamer)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(member.guild.memberCount)
  .setGuildName(member.guild.name)
  .setAvatar("https://www.site.com/avatar.jpg")
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D_e5lXfAel6s&psig=AOvVaw1S-6hF84sNziOntogPU75r&ust=1636465924609000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCrgO_0iPQCFQAAAAAdAAAAABAD")
  .toAttachment();
 
const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png")*/

  if(guildData.addons.goodbye.enabled == true){
    if(!isNaN(guildData.addons.goodbye.channel)){
      channels = client.channels.cache.get(guildData.addons.goodbye.channel)

      messages = guildData.addons.goodbye.message.replace(/{user}/g, member.user).replace(/{user_name}/g, member.user.username).replace(/{server_name}/g, guild.name).replace(/{server_membercount}/g, guild.memberCount)

      channels.send(messages)
    }
  }

  if(guildData.logs != "undefined"){
    if(!isNaN(guildData.logs)){

        desc = `**User Leave**\n \n\`user: ${member.user.tag}\` \n \`user ID: ${member.user.id}\` \n\`\`\`Server Joined At: ${member.user.joinedAt} \`\`\``

      const leaved = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setDescription(desc)

      const channels = client.channels.cache.get(guildData.logs)
      channels.send({ embeds: [leaved] })
    }
  }
}