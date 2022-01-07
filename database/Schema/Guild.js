const mongoose = require("mongoose"),
config = require("./../../config.json");

module.exports = mongoose.model("Guild", new mongoose.Schema({

    id: { type: String }, //ID of the guild
    prefix: { type: String, default: config.bot.DefaultPrefix },
    lang: { type: String, default: config.bot.DefaultLangage },
    logs: { type: String, default: "undefined" },
    suggest: { type: String, default: "undefined" },

    addons: { type: Object, default: {
        welcome: {
            enabled: false,
            channel:  null,
            message: null,
            image: false,
            embed: false
        },
        goodbye: {
            enabled: false,
            channel:  null,
            message: null,
            image: false,
            embed: false
        },
        economy: {
            defaultMoney: 200,
            defaultMoneyIcon: ":coin:"
        }
    }}

}));