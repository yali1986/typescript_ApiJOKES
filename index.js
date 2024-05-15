"use strict";
const API_URL = "https://icanhazdadjoke.com";
const HTMLresponse = document.querySelector("#app");
const nextButton = document.querySelector("#nextButton");
function readJoke() {
    fetch(API_URL, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((joke) => {
        console.clear();
        console.log(`${joke.joke}`);
        if (HTMLresponse) {
            HTMLresponse.innerHTML = `<br>${joke.joke}`;
        }
    })
        .catch((error) => console.error('Error fetching joke:', error));
}
if (nextButton) {
    nextButton.addEventListener("click", readJoke);
}
readJoke();
