"use strict"
//Due to a CORS error I couldn't use the API of the exercise so I used another API with the same logic.
//Each time you press a button a request is being sent, the data is logged in the console, and an image of a cute cat appears.
const xmlButton = document.querySelector("#xml");
const axiosButton = document.querySelector("#axios");
const textbox = document.querySelector("#textbox");
const image = document.querySelector("#cat-image")

const xhr = new XMLHttpRequest();
let xmlData;
let axiosData;


function xmlReq() {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            xmlData = JSON.parse(xhr.response);
            console.log(xmlData[0]);
            image.src = xmlData[0].url;
        } else {
            err => console.log(err)
        }
    }
    xhr.open("GET", "https://api.thecatapi.com/v1/images/search", true);
    xhr.send();
}
xmlButton.addEventListener("click", xmlReq);

function axiosReq() {
    axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then(response => {
            console.log(response.data[0]);
            axiosData = response.data[0];
            image.src = axiosData.url;
        })
        .catch(error => console.log(error))
}

axiosButton.addEventListener("click", axiosReq);