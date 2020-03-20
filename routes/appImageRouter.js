const express = require("express");
const bodyParser = require("body-parser")
const Apps = require("../models/appModel")
const imageRouter = express.Router();
const authenticate = require("../authenticate");
const multer = require("multer");
const mongoose = require("mongoose");
imageRouter.use(bodyParser.json());

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
        cb(new Error("You upload only images :) "), false)
    }
    cb(null, true);
}

const upload = multer({
    storage: Storage,
    fileFilter: imageFilter
});

imageRouter.route("/appImage")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })
    .post(upload.single("appImage"), (req, res, next) => {
        Apps.findOne({
                appName: req.body.appName
            })
            .then((app) => {
                console.log(req.body.appName + " : " + app)
                app.appImage = "images/" + req.file.originalname;
                console.log(app.appImage)
                return app.save();
            }, (err) => next(new Error("App doesn't exist :-----    " + err)))
            .then((app) => {
                res.statusCode = 200;
                res.setHeader("content-type", "application/json");
                res.json({
                    image: req.file,
                    app: app
                });
                res.redirect("../public/AddData.htm")
            }, (err) => next(new Error("doesn't save :-----    " + err)))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })




// for banner




imageRouter.route("/bannerImage")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })
    .post(upload.single("bannerImage"), (req, res, next) => {
        console.log(req.body.appName)
        Apps.findOne({
                appName: req.body.appName
            })
            .then((app) => {
                // console.log("name" + app.appName)
                console.log(req.file.originalname)
                app.bannerUrl = "images/" + req.file.originalname;
                console.log(app.bannerUrl);

                return app.save();
            }, (err) => next(new Error("App doesn't exist :-----    " + err)))
            .then((app) => {
                res.statusCode = 200;
                res.setHeader("content-type", "application/json");
                res.json({
                    image: req.file,
                    app: app
                });
                res.redirect("../public/AddData.htm")
            }, (err) => next(new Error("doesn't save :-----    " + err)))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })





//  media Url





imageRouter.route("/mediaImage")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })
    .post(upload.single("mediaImage"), (req, res, next) => {
        Apps.findOne({
                appName: req.body.appName
            })
            .then((app) => {
                app.mediaUrl = "images/" + req.file.originalname;
                return app.save();
            }, (err) => next(new Error("App doesn't exist :-----    " + err)))
            .then((app) => {
                res.statusCode = 200;
                res.setHeader("content-type", "");
                res.json({
                    image: req.file,
                    app: app,
                    url : "localhost:3000/addData.htm"
                });
                
            }, (err) => next(new Error("doesn't save :-----    " + err)))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 404;
        res.end("method does'nt supported ");
    })



module.exports = imageRouter;