let token = localStorage.getItem("token");
let acName;
function show() {

    let id = location.href.split("?")[1]
    console.log(id)
// let url = "https://artoholic.azurewebsites.net/accounts/" + id
    
    let url = "http://localhost:3000/accounts/" + id;
    let params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : "bearer " + token
        },
    }
    fetch(url,params)
        .then(res => res.json())
        .then((json) => {
            console.log(json[0])
            acName = json[0].accountName;
            document.getElementById("AccountName").value = json[0].accountName
            document.getElementById("AccountLink").value = json[0].accountLink;
            document.getElementById("PrivacyLink").value = json[0].privacyLink;
        });
}
show();

// console.log(appName.value)
let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let accountName = document.getElementById("AccountName");
    let AccountLink = document.getElementById("AccountLink");
    let PrivacyLink = document.getElementById("PrivacyLink");

    // console.log(appName.value)
    // let url = "https://artoholic.azurewebsites.net/accounts/" + acName

    let url = "http://localhost:3000/accounts/" + acName
    let data = {
        "accountName": accountName.value,
        "accountLink": AccountLink.value,
        "privacyLink": PrivacyLink.value,
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
            location = "../account.htm";
        });

})