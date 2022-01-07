const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");
const error = require("../../utils/error")

module.exports.run = async (client, message, args, lang, data) => { 

    const content = message.content.split(" ").slice(1).join(" ");
             const result = new Promise((resolve, reject) => resolve(eval(content)));
               return result.then((output) => {
               if(typeof output !== "string"){
                 output = require("util").inspect(output, { depth: 0 });
               }
               if(output.includes(message.client.token)){
                 output = output.replace(message.client.token, "T0K3N");
               }
               message.channel.send(output, {
                 code: "js"
                });
             }).catch((err) => {
               err = err.toString();
               if(err.includes(message.client.token)){
                 err = err.replace(message.client.token, "T0K3N");
               }
                message.channel.send(err, {
                 code: "js"
                });
            });
             
}

module.exports.help = {
    name: `eval`,
    aliases: [],
    category: "owner",
    descriptionfr: ".",
    descriptionen: ".",
    usage: "`.eval <args>`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: true, 
    ownerOnly: true,
    disabled: false
}