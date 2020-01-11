const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating schema
const ResSchema = new Schema({
    resName: {
        type: String,
        required: true
    },
    resDesc: {
        type: String,
        required: true
    },
    resCat: {
        type: String,
        required: true
    },
});

module.exports = Res = mongoose.model('res', ResSchema);