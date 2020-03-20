
let AccountName = document.getElementById("AccountName");
let AccountLink = document.getElementById("AccountLink");
let PrivacyLink = document.getElementById("PrivacyLink");
let submit = document.getElementById("submit");
let mes = document.getElementById("mes");

let token = localStorage.getItem("token");


submit.addEventListener("click", (e) => {
    console.log(AccountName.value)
    // let url = "https://artoholic.azurewebsites.net/accounts"

    let url = "http://localhost:3000/accounts"
    let data = {
        "accountName" : AccountName.value,
        "privacyLink" : AccountLink.value,
        "accountLink" : PrivacyLink.value
    }
    let params = {
        method: 'post',
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
            mes.classList.remove("d-none");
            AccountName.value = ""
            AccountLink.value = ""
            PrivacyLink.value = ""
        });
        e.preventDefault();
})
