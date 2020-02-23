"use strict"
//XMLHttp request function
let xhr = new XMLHttpRequest;
function requestXml() {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.log("Error! Data not found.")
        }
    };
    xhr.open("GET", "https://www.randomuser.me/api", true);
    xhr.send();
};

document.querySelector("#xmlhttp").addEventListener("click", requestXml)

//Axios request function
const axios = require('axios').default;
function requestAxios() {
    axios
        .get("https://www.randomuser.me/api")
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
}
document.querySelector("#axios").addEventListener("click", requestAxios);

