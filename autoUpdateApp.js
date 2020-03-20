const fetch = require("fetch").fetchUrl;
const Apps = require("./models/appModel")

    Apps.find({})
    .then((apps)=>{
        console("mohit hai ",apps)
        for(app of apps)
        {
            console.log(app);
            console.log(app.appUrl);
            fetch(app.appUrl)
            .then((response)=>{
                return response.json;
            })
            .then((data)=>{
                console.log(data);
            }).catch((err) => console.log(err));
        }
    }).catch((err)=>console.log(err));


