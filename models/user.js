const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type:String,default:undefined},
  username: {type:String,unique:true,required: true},
  auth0_id:{type:String,unique:true,required: true},
  playthrough_names: {type:Array, default: []}
});

const User = mongoose.model("User",userSchema);

module.exports = User;