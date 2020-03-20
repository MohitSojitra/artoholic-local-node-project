const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userModel = new Schema({
    admin:{
        type:Boolean,
        default : false
    }
},{
    timestamps:true
})

userModel.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userModel);