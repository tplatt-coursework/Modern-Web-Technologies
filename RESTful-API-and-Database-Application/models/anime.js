let mongoose = require("mongoose")

let animeSchema = new mongoose.Schema({
    Name: String,
    Studio: String, 
    Episodes: Number,
    Aired: Date
})

animeSchema.statics.listAllAnime = function() {
    return this.find({},'-_id -__v')
}

let animeModel = mongoose.model('anime', animeSchema)

module.exports = animeModel