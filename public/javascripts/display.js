
function show()
{
let url = "https://artoholic.azurewebsites.net/apps/"
    
    // let url = "http://localhost:3000/apps"
    fetch(url)
    .then(res => res.json())
    .then(json => {
        html = "";
        json.forEach(element => {
            console.log(element);
            html+=`<div class="card col-md-4" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.appName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${element.packageName}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                    the
                    card's content.</p>
                <a href="#" class="card-link">banner url</a>
                <a href="#" class="card-link">media url</a>
                <a href="../Singleview.htm?${element.appName}"><button class="btn btn-success" id="${element.appName}">View</button></a>
            </div>
        </div>`
       
        });

        document.getElementById("dynemic").innerHTML = html;
    });
    // console.log(data);
}
show();






