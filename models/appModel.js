const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appModel = new Schema({
    appName : { 
        type : String,
        required : true,
        unique : true
    },
    appImage :{  //image
        type : String,
    },
    mediaUrl : { // image
        type:String
    },
    packageName : {
        type : String,
        required : true
    },
    appUrl : {
        type : String,
        required : true
    },
    title:{
        type: String,
        required : true
    },
    socialContext :{
        type : String,
        required:true
    },
    body :{
        type : String,
        required:true
    },
    callToAction :{
        type : String,
        required:true
    },
    bannerUrl :{ // image
        type : String
    },
    status : {
        type: Boolean,
        default : false,
        required:true
    },
    accountName:{
        type:String,
        required : true
    },
    rating:{
        type: Number,
        min: 0,
        max : 5
    },
    review:{
        type : String
    }
}
,{
    timestamps : true
})

const app = mongoose.model("app" , appModel);

module.exports = app;