const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    album: { type: String, required: true},
    artist: { type: String, required: false},
    year: {type: Number, required: false},
    artwork: {type: String, required: true}
});

const Album = mongoose.model("Album", musicSchema);

module.exports = Album;