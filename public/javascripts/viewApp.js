let appName = document.getElementById("appName");
let packageName = document.getElementById("packageName");
let appUrl = document.getElementById("appUrl");
let status = document.getElementById("status");
let aName = document.getElementById("aName");
let title = document.getElementById("title");
let socialContext = document.getElementById("socialContext");
let body = document.getElementById("body");
let callToAction = document.getElementById("callToAction");
let updateApp = document.getElementById("updateApp");
let DeleteApp = document.getElementById("DeleteApp");

let DappName = document.getElementById("DappName")
let DappNameA = document.getElementById("DappNameA")
let DappNameB = document.getElementById("DappNameB")
let DappNameM = document.getElementById("DappNameM")

let mediaImage = document.getElementById("mediaImageUrl")
let bannerImage = document.getElementById("bannerImageUrl")
let appImage = document.getElementById("appImageUrl")


let token = localStorage.getItem("token")
let id = location.href.toString().split("?")[1];
console.log(id);
let appNameHeading = document.getElementById("appNameHeading");
appNameHeading.innerText = id;
console.log(appNameHeading)
// let url = "https://artoholic.azurewebsites.net/apps/" + id

let url = "http://localhost:3000/apps" + "/" + id;

let params = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "bearer " + token
    },
}
fetch(url, params)
    .then(res => res.json())
    .then((json) => {

        DappName.value = json[0].appName
        DappNameA.value = json[0].appName
        DappNameB.value = json[0].appName
        DappNameM.value = json[0].appName

        console.log(json)
        appName.value = json[0].appName
        packageName.value = json[0].packageName
        appUrl.value = json[0].appUrl
        status.value = json[0].status == true ? "activate" : "deActivate"
        aName.value = json[0].accountName
        title.value = json[0].title
        socialContext.value = json[0].socialContext
        body.value = json[0].body
        callToAction.value = json[0].callToAction
        appImage.setAttribute("src", json[0].appImage)
        bannerImage.setAttribute("src", "../" + json[0].bannerUrl)
        mediaImage.setAttribute("src", "../" + json[0].mediaUrl)
    }).catch((err) => {
        console.log(err)
    });



DeleteApp.addEventListener("click", (e) => {

    let token = localStorage.getItem("token")
    let id = location.href.toString().split("?")[1];
    // let url = "https://artoholic.azurewebsites.net/apps/" + id

    let url = "http://localhost:3000/apps" + "/" + id;
    let params = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "bearer " + token
        },
    }
    fetch(url, params)
        .then(res => res.json())
        .then((json) => {
            location = "../devloperIndex.htm"
        }).catch((err) => {
            console.log(err)
        });

})



updateApp.addEventListener("click", (e) => {
    location = "../AddDataUpdate.htm?" + appName.value;
    console.log(location)
})