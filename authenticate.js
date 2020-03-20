const passport = require("passport")
const LocalStretagy = require("passport-local").Strategy;
const User = require("./models/userModel");
const JwtStretagy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const jwt = require("jsonwebtoken");

const config = require("./config");
passport.use(new LocalStretagy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

exports.getToken = function(user){
    return jwt.sign(user , config.secret , {expiresIn: 604800});
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

exports.jwtPassport = passport.use(new JwtStretagy(opts , (jwt_payload , done) =>{
    User.findOne({_id : jwt_payload._id} , (err , user) =>{
        if(err)
        {
            return done(err , false);
        }
        else if(user)
        {
            return done(null , user);
        }
        else{
            return done(null , false)
        }
    })
}));

exports.verifyUser = passport.authenticate("jwt" , {session : false})

exports.verifyAdmin = (req,res,next) =>{
    if(req.user.admin)
    {
        next()
    }
    else{
        let err = new Error("You are not Admin");
        err.status = 401;
        next(err)
        return
    }
}