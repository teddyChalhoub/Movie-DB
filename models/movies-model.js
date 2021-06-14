let mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

let moviesSchema = mongoose.Schema({
    title: {type: String, required:true},
    year: { type: Number, min: 1000, max: 9999,required:true},
    rating: {type: Number,default:4}
}, { _id: false });

moviesSchema.plugin(AutoIncrement);

let moviesModel = mongoose.model("movie",moviesSchema);

module.exports = moviesModel;