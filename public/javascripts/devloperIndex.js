

let token = localStorage.getItem("token");
// let url = "https://artoholic.azurewebsites.net/apps/"

let url = "http://localhost:3000/apps"
let params = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "bearer " + token
    },
}
let dynemic = document.getElementById("dynemic");
let html ="";
fetch(url, params)
    .then(res => res.json())
    .then((json) => {
        Array(json).forEach((element , j) => {
            element.forEach((ele , j) =>{
                if(j%2 == 0)
                {
                    html += `
                    <div class="col-md-6 col-12 card_app" align="center">
                        <div class="app">
                        <h2>${ele.accountName}</h2>
                        <div class="upper">
                            <img src="http://localhost:3000/${ele.appImage}" height="60px" alt="...">
                            <a href="../viewApp.htm?${ele.appName}" class="btn d-block">VIEW</a>
                        </div>
                        <div class="lower">
                            <h3>${ele.appName}</h3>
                            
                        </div>
                        </div>
                    </div>
                    `
                }
                else{
                    html += `
                    <div class="col-md-6 col-12 card_app" align="center">
                        <div class="app">
                        <h2>${ele.accountName}</h2>
                        <div class="upper">
                            <img src="http://localhost:3000/${ele.appImage}" height="60px" alt="...">
                            <a href="../viewApp.htm?${ele.appName}" class="btn d-block">VIEW</a>
                        </div>
                        <div class="lower">
                            <h3>${ele.appName}</h3>
                        </div>
                        </div>
                    </div>
                    `
                }
                dynemic.innerHTML = html;
         })
        });
    });

    // app Name change event 

    let appNameChange = document.getElementById("appNameChange");

    appNameChange.addEventListener("input" , (e)=>{
        let val = e.target.value.toLowerCase();
        console.log(val)

        let app = document.getElementsByClassName("card_app");
        Array.from(app).forEach((element) =>{
            let ap = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
            let ac = element.getElementsByTagName("h2")[0].innerText.toLowerCase();
            if(ap.includes(val) || ac.includes(val))
            {
                element.style.display = "block"
            }
            else{
                element.style.display = "none"
            }

        })
    })

    // end of app Name end event