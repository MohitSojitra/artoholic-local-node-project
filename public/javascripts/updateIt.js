let token = localStorage.getItem("token")
let accountName = document.getElementById("accountName");
let appName = document.getElementById("appName");
let packageName = document.getElementById("packageName");
let appUrl = document.getElementById("appUrl");
let statusAD = document.getElementById("status");
let aName = document.getElementById("accountName");
let title = document.getElementById("title");
let socialContext = document.getElementById("socialContext");
let body = document.getElementById("body");
let callToAction = document.getElementById("callToAction");
let updateApp = document.getElementById("updateApp");





packageName.addEventListener("blur", (e) => {
    appUrl.value = "https://play.google.com/store/apps/details?id=" + packageName.value;
})


accountName.addEventListener("change", (e) => {
    let aName = e.target.value;
    if (aName == "none") {
        document.getElementById("AccountLink").value = "";
        document.getElementById("PrivacyLink").value = "";
    } else {
        // let url = "https://artoholic.azurewebsites.net/accounts/" + aName

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






function show() {
    let id = location.href.split("?")[1]
    console.log(id)
    // let url = "https://artoholic.azurewebsites.net/apps/" + id

    let url = "http://localhost:3000/apps/" + id;
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
            console.log(json[0])
            appName.value = json[0].appName
            packageName.value = json[0].packageName
            appUrl.value = json[0].appUrl
            if (json[0].status == true) {
                let st = statusAD.lastElementChild;
                st.setAttribute("selected", "")
            }
            
            title.value = json[0].title
            socialContext.value = json[0].socialContext
            body.value = json[0].body
            callToAction.value = json[0].callToAction

            // let url = "https://artoholic.azurewebsites.net/accounts/"

            let Url = "http://localhost:3000/accounts";
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

                    json.forEach((element, j) => {
                        if(element.accountName == json[0].accountName)
                        {
                            accountName.innerHTML += `<option value="${element.accountName}" selected>${element.accountName}</option>`
                            document.getElementById("AccountLink").value = json[0].accountLink;
                            document.getElementById("PrivacyLink").value = json[0].privacyLink;
                        }
                        else{
                            accountName.innerHTML += `<option value="${element.accountName}">${element.accountName}</option>`
                            document.getElementById("AccountLink").value = json[0].accountLink;
                            document.getElementById("PrivacyLink").value = json[0].privacyLink;
                        }
                    });
                });
        });
}
show();

// console.log(appName.value)

updateApp.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(appName.value)
    // let url = "https://artoholic.azurewebsites.net/apps/" + appName.value;

    let url = "http://localhost:3000/apps/" + appName.value
    let data = {
        "appName": appName.value,
        
        "packageName": packageName.value,
        "appUrl": appUrl.value,
        "status" : statusAD.value,
        "accountName" : aName.value,
        "title": title.value,
        "socialContext": socialContext.value,
        "body": body.value,
        "callToAction": callToAction.value,
    }

    let params = {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : "bearer " + token
        },
    }
    fetch(url, params)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            location = "../devloperIndex.htm";
        });


})