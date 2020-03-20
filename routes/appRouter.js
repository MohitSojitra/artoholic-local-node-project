const express = require("express");
const bodyParser = require("body-parser")
const Apps = require("../models/appModel")
const appRouter = express.Router();
const authenticate = require("../authenticate");
appRouter.use(bodyParser.json());

appRouter.route("/")
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader("content-type" , "text/plain");
    next();
})
.get(authenticate.verifyUser,(req,res,next)=>{
    Apps.find({})
    .then((apps) =>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(apps)
    }).catch((err)=> next(err))
    
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
   Apps.create(req.body)
   .then((app)=>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(app)
   }).catch((err)=> next(err))
})
.put(authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
    res.statusCode = 404;
    res.end("method does'nt supported ");
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
  Apps.remove({})
  .then((apps)=>{
    res.statusCode = 200;
    res.setHeader("content-type" , "application/json");
    res.json(apps);
  })
});



appRouter.route("/:appName")
.get(authenticate.verifyUser ,(req,res,next)=>{
    Apps.find({appName : req.params.appName})
    .then((app) =>{
        
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(app)
    }).catch((err)=> next(err))
    
})
.post(authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
    res.statusCode = 404;
    res.end("method does'nt supported ");
    
})
.put(authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
    
    Apps.findOneAndUpdate({appName : req.params.appName} , {$set : req.body} , {new : true})
   .then((app)=>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(app)
   }).catch((err)=> next(err))
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin ,(req,res,next) =>{
    Apps.findOneAndRemove({appName : req.params.appName})
    .then((app) =>{
        res.statusCode = 200;
        res.setHeader("content-type" , "application/json");
        res.json(app)
    }).catch((err)=> next(err))
})

module.exports = appRouter;