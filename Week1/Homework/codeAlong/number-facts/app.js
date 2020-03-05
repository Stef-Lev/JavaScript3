"use strict"

let fact = document.querySelector("#fact");
let factText = document.querySelector("#factText");

let numberInput = document.querySelector("#numberInput");
numberInput.addEventListener("input", getFact)

function getFact() {
    let number = numberInput.value;
    fetch("http://numbersapi.com/" + number)
        .then(response => response.text())
        .then(data => {
            if (number != "") {
                console.log(numberInput.value)
                fact.style.display = "block";
                factText.innerHTML = data;

            }
        })
        .catch(err => console.log(err))
}