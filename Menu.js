const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    resName:{
        type: String,
        required: true
    },
    menuName: {
        type: String,
        required: true
    },
    menuCat: {
        type: String,
        required: true
    },
    menuDesc: {
        type: String,
        required: true
    },
    menuPrice: {
        type: Number,
        required: true
    }
});

module.exports = menu = mongoose.model('Menu',menuSchema);