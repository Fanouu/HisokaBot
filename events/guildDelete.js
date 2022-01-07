const cfg = require("../config.json");
const Discord = require("discord.js")

module.exports = async (client, guild) => {

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
          .setLabel('Add Me')
          .setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=905922365077225523&permissions=8&scope=bot')
      );

    const guildRemoveEmbed = new Discord.MessageEmbed()
    .addField("Server Removed", `ont viens de me retirer du server \`${guild.name}\`, je passe à \`${client.guilds.cache.size}\` **server(s)**`)
    .addField('🧾 - Name', `${guild.name}`, false)
    .addField('<:members:907085966672556042> - Utilisateur', `${guild.memberCount}`, false)
    .addField('👑 - Createur', `<@${guild.ownerId}> - (||${guild.ownerId}||)`, false)
    .setThumbnail(guild.iconURL)
    .setColor("RED")
    .setTimestamp()

    msgChannel = client.channels.cache.get("833636960874266685")
    msgChannel.send({embeds: [guildRemoveEmbed], components: [row]})

};