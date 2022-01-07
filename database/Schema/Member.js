const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({
    id: { type: String },
    guildID: { type: String },
    money: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },

    addons: { type: Object, default: {
    	cooldown: {
    		minage: 0,
    		work: 0,
    		rob: 0
    	}
    }}
}));