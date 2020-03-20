// console.log("hii hello")




let token = localStorage.getItem("token");
// let url = "https://artoholic.azurewebsites.net/accounts"

let url = "http://localhost:3000/accounts"
let params = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "bearer " + token
    },
}
let dynemic = document.getElementById("dynemic");
let html = ""
fetch(url, params)
    .then(res => res.json())
    .then((json) => {
        Array(json).forEach((element, j) => {
            // let len= element.length;
            element.forEach((ele, j) => {
                // console.log(ele)
                // console.log(j)

                html += `
                <div class="col-md-5 m">
                    <div class="card">
                        <h2>${ele.accountName}</h2>
                        <div class="card-body">
                            <h5>Account Link: ${ele.accountLink}</h5>
                            <p>Privacy Link: ${ele.privacyLink}</p>
                            <a href="../updateAccount.htm?${ele.accountName}" type="button" class="btn btn-success" id="${ele.accountName}">Update</a>
                            <button type="button" class="btn btn-danger" id="${ele.accountName}" onclick="deleteIt(this.id)">Delete</button>
                        </div>
                    </div>
                </div>
                `
                // i+=1;
                // console.log(i)
                dynemic.innerHTML = html;
            })
        });
    });


function deleteIt(accountName) {
    console.log(accountName)
    // let url = "https://artoholic.azurewebsites.net/accounts/" + accountName

    let url = "http://localhost:3000/accounts/" + accountName;
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
            console.log(json)
            location = "../account.htm"
        });
}