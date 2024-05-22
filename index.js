"use strict";
const API_URL_JOKES = "https://icanhazdadjoke.com";
const API_URL_CHUCK = "https://api.chucknorris.io/jokes/random";
const nextButton = document.querySelector("#nextButton");
const reportAcudits = [];
// Variable para almacenar el chiste actual
let currentJoke = null;
// Variable para alternar entre chistes
let useChuckNorris = false;
// Weather
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let weatherIcon = document.querySelector("#weather-icon");
// API Weather
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            // ID API
            const api_id = "d745881a8a1897a666f58641b5a627d2";
            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_id}`;
            fetch(url_base)
                .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
                .then(data => {
                if (temperature && summary && loc && weatherIcon) {
                    temperature.textContent = Math.floor(data.main.temp) + "°C";
                    summary.textContent = data.weather[0].description;
                    loc.textContent = data.name + ", " + data.sys.country;
                    //icono del tiempo
                    let iconCode = data.weather[0].icon;
                    let urlIcono = `https://openweathermap.org/img/wn/${iconCode}.png`;
                    weatherIcon.src = urlIcono;
                    weatherIcon.alt = data.weather[0].description;
                }
                else {
                    console.error("Uno o más elementos del DOM no se encontraron.");
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
// Función para obtener y mostrar un chiste de la API de icanhazdadjoke
function readJoke() {
    fetch(API_URL_JOKES, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((joke) => {
        displayJoke(joke.joke);
    })
        .catch((error) => console.error('Error fetching joke:', error));
}
// Función para obtener y mostrar un chiste de la API de Chuck Norris
function readChuckNorrisJoke() {
    fetch(API_URL_CHUCK)
        .then(res => res.json())
        .then((joke) => {
        displayJoke(joke.value);
    })
        .catch((error) => console.error('Error fetching Chuck Norris joke:', error));
}
// Función para mostrar el chiste en el HTML
function displayJoke(joke) {
    console.log(joke);
    const jokePlaceholder = document.querySelector("#jokePlaceholder");
    if (jokePlaceholder) {
        jokePlaceholder.textContent = joke;
    }
    else {
        console.error("Joke placeholder not found");
    }
    // Almacena el chiste actual
    currentJoke = joke;
    // Resetea y configura los botones de puntuación
    setupScoreButtons();
}
// Función para los botones de puntuación
function setupScoreButtons() {
    const scoreButtons = document.querySelectorAll(".score-button");
    scoreButtons.forEach(button => {
        button.removeEventListener("click", handleScoreButtonClick);
        button.addEventListener("click", handleScoreButtonClick);
    });
}
// Maneja el clic en los botones de puntuación
function handleScoreButtonClick(event) {
    const button = event.target;
    const score = parseInt(button.textContent);
    saveJokeScore(score);
}
// Guarda la puntuación del chiste
function saveJokeScore(score) {
    if (currentJoke !== null) {
        const existingReportIndex = reportAcudits.findIndex(report => report.joke === currentJoke);
        if (existingReportIndex !== -1) {
            // Actualiza el reporte existente con la nueva puntuación
            reportAcudits[existingReportIndex].score = score;
        }
        else {
            // Crea un nuevo reporte si no existe
            const report = {
                joke: currentJoke,
                date: new Date().toISOString(),
                score
            };
            reportAcudits.push(report);
        }
        // Visualización del reporte en consola
        console.log("Report d'acudits:", reportAcudits);
    }
}
if (nextButton) {
    nextButton.addEventListener("click", () => {
        // Guarda el reporte del chiste actual antes de obtener uno nuevo
        saveJokeScore(null);
        // Alternar entre las dos fuentes de chistes
        if (useChuckNorris) {
            readChuckNorrisJoke();
        }
        else {
            readJoke();
        }
        useChuckNorris = !useChuckNorris;
    });
}
else {
    console.error("Next button not found");
}
// Lee el primer chiste al cargar la página
readJoke();
// //para iconos externos estáticos
// // Asegúrate de que el elemento con el id 'weather-icon' existe
// const weatherIconDiv = document.getElementById('weather-icon') as HTMLDivElement | null;
// if (weatherIconDiv) {
//     console.log(data.weather[0].icon);
//     let iconCode = data.weather[0].icon;
//     const urlIcono = `https://openweathermap.org/img/wn/${iconCode}.png`;
//     console.log(urlIcono);
//     // Crea un elemento de imagen y establece su src a la URL del ícono
//     const weatherIcon = document.createElement('img');
//     weatherIcon.src = urlIcono;
//     weatherIcon.alt = data.weather[0].description; // Opcional: establece el texto alternativo
//     // Limpia el contenido anterior de weatherIconDiv y agrega el ícono
//     weatherIconDiv.innerHTML = '';
//     weatherIconDiv.appendChild(weatherIcon);
// } else {
//     console.error("El elemento con id 'weather-icon' no se encontró en el DOM.");
// }
