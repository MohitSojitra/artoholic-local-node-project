var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();
var User = require("../models/userModel");
var passport = require("passport")
var authenticate = require("../authenticate");
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup" , (req,res,next) =>{
  User.register(new User({username : req.body.username}) , req.body.password , (err , user) =>{
    if(err)
    {
      let err = new Error("You are unable to login");
      err.status = 401;
      next(err);
    }
    else if(user)
    {
      passport.authenticate("local")(req,res , ()=>{
        res.statusCode = 200;
        res.setHeader("Content-type" , "application/json");
        res.json({success : "ok" , user : user});
      }) 
    }
  })
  
})

router.post("/login", passport.authenticate("local"),(req,res,next)=>{
  var token = authenticate.getToken({_id :req.user._id});
  res.statusCode = 200;
  res.setHeader("Content-type" , "application/json");
  res.json({success : "ok" , token : token});
})


router.get("/logout" , (req,res,next) =>{
  if(req.user)
  {
    req.session.destroy();
    res.clearCookie("sessionId");
    res.redirect("/");
  }
  else{
    let err = new Error("You must first login");
      err.status = 403;
      next(err);
  }
})

module.exports = router;
