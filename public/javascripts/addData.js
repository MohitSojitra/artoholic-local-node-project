let token = localStorage.getItem("token");

let appName = document.getElementById("appName");
let packageName = document.getElementById("packageName");
let appUrl = document.getElementById("appUrl");
let status = document.getElementById("status");
let accountName = document.getElementById("accountName");
let title = document.getElementById("title");
let socialContext = document.getElementById("socialContext");
let body = document.getElementById("body");
let callToAction = document.getElementById("callToAction");

let submit = document.getElementById("submit");

// console.log(appName.value)





// package name App Url autometic

packageName.addEventListener("blur" , (e)=>{
    appUrl.value = "https://play.google.com/store/apps/details?id="+packageName.value;
})

// end of package name and app Url




// add select option
// let url = "https://artoholic.azurewebsites.net/accounts"

let url = "http://localhost:3000/accounts";
    params = {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "bearer " + token
        }
    }
    fetch(url, params)
        .then(res => res.json())
        .then((json) => {

            json.forEach((element , j) => {
                accountName.innerHTML += `<option value="${element.accountName}">${element.accountName}</option>`
            });
            // document.getElementById("AccountLink").value = json[0].accountLink;
            // document.getElementById("PrivacyLink").value = json[0].privacyLink;
        });


//end of add sselect option

// for account name
accountName.addEventListener("change", (e) => {

    let aName = e.target.value;
    if(aName == "none")
    {
        document.getElementById("AccountLink").value = "";
        document.getElementById("PrivacyLink").value = "";
    }
    else{
        // let url = "https://artoholic.azurewebsites.net/accounts/" + aName;

        let Url = "http://localhost:3000/accounts/" + aName;
        params = {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "bearer " + token
            }
        }
        fetch(Url, params)
            .then(res => res.json())
            .then((json) => {
                document.getElementById("AccountLink").value = json[0].accountLink;
                document.getElementById("PrivacyLink").value = json[0].privacyLink;
            });
    }

})

// end of account name



//for image
let DappName = document.getElementById("DappName");
let DappNameA = document.getElementById("DappNameA");
let DappNameB = document.getElementById("DappNameB");
let DappNameM = document.getElementById("DappNameM");


appName.addEventListener("blur", (e) => {
    DappName.value = appName.value;
    DappNameA.value = appName.value;
    DappNameB.value = appName.value;
    DappNameM.value = appName.value;
})
// end of image




dMes = document.getElementById("dMes")
mes = document.getElementById("mes")
submit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(appName.value)
    // let url = "https://artoholic.azurewebsites.net/apps"

    let url = "http://localhost:3000/apps"
    let data = {
        "appName": appName.value,
        "packageName": packageName.value,
        "appUrl": appUrl.value,
        "title": title.value,
        "socialContext": socialContext.value,
        "body": body.value,
        "callToAction": callToAction.value,
        "status" : status.value,
        "accountName" : accountName.value
    }
    let params = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "bearer " + token
        },
    }
    fetch(url, params)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            mes.classList.remove("d-none");
        }).catch((err) =>{
            dMes.classList.remove("d-none");
        });
})