let token = localStorage.getItem("token")
        let url = "http://localhost:3000/check"

        
        let params = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : "bearer " + token
        },
    }
    fetch(url, params)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            location = "./devloperIndex.htm"
        }).catch(err=> console.log(err));