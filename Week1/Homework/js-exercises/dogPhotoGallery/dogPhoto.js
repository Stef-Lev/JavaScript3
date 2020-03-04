"use strict"
const xmlButton = document.querySelector("#xml");
const axButton = document.querySelector("#axios");
const ul = document.querySelector("ul");


const xml = new XMLHttpRequest();
let xmData;
let axData;
let newLi;
let newImg;


function requestXML() {
    xml.onreadystatechange = () => {
        if (xml.readyState === 4 && xml.status === 200) {
            xmData = JSON.parse(xml.response);
            console.log(xml.response);
            newLi = document.createElement("li");
            newImg = document.createElement("img");
            newImg.src = xmData.message;
            newLi.appendChild(newImg);
            ul.appendChild(newLi);

        } else {
            err => console.log(err)
        }
    }

    xml.open("GET", "https://dog.ceo/api/breeds/image/random", true);
    xml.send();
}
xmlButton.addEventListener("click", requestXML);

function requestAxios() {
    axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then(resp => {
            console.log(resp);
            axData = resp.data.message;
            newLi = document.createElement("li");
            newImg = document.createElement("img");
            newImg.src = axData;
            newLi.appendChild(newImg);
            ul.appendChild(newLi);

        })
        .catch(err => console.log(err))
}
axButton.addEventListener("click", requestAxios)