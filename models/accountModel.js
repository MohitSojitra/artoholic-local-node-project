const mongoose = require("mongoose");
const Schema = mongoose.Schema;


accountModel = new Schema({
    accountName : {
        type: String,
        required:true,
        unique : true
    },
    privacyLink : {
        type :String,
        required : true
    },
    accountLink :{
        type  :String,
        required:true
    }
},{
    timestamps: true
})


module.exports = mongoose.model("account" , accountModel);