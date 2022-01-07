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

    const guildCreateEmbed = new Discord.MessageEmbed()
    .addField("Server Added", `ont viens de m'ajouter sur \`${guild.name}\`, je suis à \`${client.guilds.cache.size}\` **server(s)**`)
    .addField('<:members:907085966672556042> - Utilisateur', `${guild.memberCount}`, false)
    .addField('👑 - Createur', `<@${guild.ownerId}> - (||${guild.ownerId}||)`, false)
    .setThumbnail(guild.iconURL)
    .setColor("GREEN")
    .setTimestamp()

    msgChannel = client.channels.cache.get("905874587512872980")
    msgChannel.send({embeds: [guildCreateEmbed], components: [row]})

};