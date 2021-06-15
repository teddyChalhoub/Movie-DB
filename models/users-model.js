let mongoose = require("mongoose");

let usersSchema = mongoose.Schema({
   username:{type:String, required:true},
   password:{type:String, required:true},
},{ collection : 'user' });

let usersModel = mongoose.model("user",usersSchema);

module.exports = usersModel;