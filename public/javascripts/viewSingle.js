let div = document.querySelector(".dynemic2");

let id = location.href.toString().split("?")[1];

console.log(id)
console.log(div);
let url = "https://artoholic.azurewebsites.net/apps/" + id

// let url = "http://localhost:3000/apps"+"/"+id;
html = "";
fetch(url)
.then((res) => res.json())
.then((json) => {
    console.log(json)
    html += `<div class="card col-md-4" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${json[0].appName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${json[0].packageName}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                    the
                    card's content.</p>
                <a href="#" class="card-link">banner url</a>
                <a href="#" class="card-link">media url</a>
                <a href="../AddDataUpdate.htm?${json[0].appName}"><button class="btn btn-success" id="${json[0].appName}">UpdateIt</button></a>
                <button class="btn btn-success" id="${json[0].appName}" onclick="deleteData(this.id)">deleteIt</button>
            </div>
        </div>`

    div.innerHTML = html;
});

function deleteData(id)
{
    let url = "https://artoholic.azurewebsites.net/apps/" + id

    // let url = "http://localhost:3000/apps/"+id;
    let data = {
        "appName" : id
    }

    let params = {
        method: 'delete',
        body:JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }
fetch(url, params)
    .then(res => res.json())
    .then((json) => {
        console.log(json)
        location = "../display.htm"
    });
}