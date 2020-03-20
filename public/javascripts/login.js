let username = document.getElementById("username");
let password = document.getElementById("password");
let mes = document.getElementById("mes");   
console.log("its run ??")
document.getElementById("submit").addEventListener("click", (e) => {

        // let url = "https://artoholic.azurewebsites.net/users/login"
        let url = "http://localhost:3000/users/login"

        let data = {
            "username": username.value,
            "password": password.value
        }
        let params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(url, params)
            .then(res => {
                return res.json()
            },err=>{
                console.log("Something wrong")
            })
            .then((json) => {
                console.log(json)
                if(json.success == "ok")
                {
                    localStorage.setItem("token" , json.token);
                    location = "../devloperIndex.htm"
                }
            }).catch((err) =>{
                mes.classList.remove("d-none")
            });
})