"use strict";
const API_URL = "https://icanhazdadjoke.com";
//const API_URL_WEATHER: string = ""
const nextButton = document.querySelector("#nextButton");
const reportAcudits = [];
// Variable para almacenar el chiste actual
let currentJoke = null;
//Weather
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
const kelvin = 273.15;
// API Weather
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            // ID API
            const api_id = "d745881a8a1897a666f58641b5a627d2";
            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_id}`;
            fetch(url_base)
                .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
                .then(data => {
                console.log("Esta es la data");
                console.log(data);
                if (temperature && summary && loc) {
                    temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
                    summary.textContent = data.weather[0].description;
                    loc.textContent = data.name + ", " + data.sys.country;
                }
            })
                .catch(error => {
                console.error("Fetch error:", error);
            });
        }, error => {
            console.error("Geolocation error:", error);
        });
    }
    else {
        console.error("Geolocation is not supported by this browser.");
    }
});
// Función para obtener y mostrar un chiste
function readJoke() {
    fetch(API_URL, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((joke) => {
        console.log(`${joke.joke}`);
        //Imprimir por pantalla el chiste
        const jokePlaceholder = document.querySelector("#jokePlaceholder");
        if (jokePlaceholder) {
            jokePlaceholder.textContent = joke.joke;
        }
        // Almacena el chiste actual
        currentJoke = joke.joke;
        // Resetea y configura los botones de puntuación
        setupScoreButtons();
    })
        .catch((error) => console.error('Error fetching joke:', error));
}
// Función para los botones de puntuación
function setupScoreButtons() {
    let score = null;
    const scoreButtons = document.querySelectorAll(".score-button");
    scoreButtons.forEach(button => {
        button.addEventListener("click", () => {
            score = parseInt(button.textContent);
        });
    });
    // Guarda el reporte cada vez que se hace clic en "Siguiente chiste"
    nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener("click", () => {
        if (currentJoke !== null) {
            const report = {
                joke: currentJoke,
                date: new Date().toISOString(),
                score
            };
            reportAcudits.push(report);
            // Visualización del reporte en consola
            console.log("Report d'acudits:", reportAcudits);
            // Resetea el score para el siguiente chiste
            score = null;
        }
    }, { once: true }); // Cuando se añade un event listener con { once: true }, el listener se activará una sola vez y luego se eliminará automáticamente. 
    //En este contexto se utiliza para asegurar que el listener, que agrega un reporte al array reportAcudits, se ejecute una sola vez por cada clic en el botón "Siguiente chiste".
}
if (nextButton) {
    nextButton.addEventListener("click", readJoke);
}
readJoke();
