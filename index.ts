const API_URL: string = "https://icanhazdadjoke.com"
//const API_URL_WEATHER: string = ""
const nextButton: HTMLButtonElement | null = document.querySelector("#nextButton")

const reportAcudits: { joke: string; date: string; score: number | null; }[] = []

// Variable para almacenar el chiste actual
let currentJoke: string | null = null


//Weather

let lon: number
let lat: number
let temperature: HTMLElement | null = document.querySelector(".temp")
let summary: HTMLElement | null = document.querySelector(".summary")
let loc: HTMLElement | null = document.querySelector(".location")

const kelvin: number = 273.15

// API Weather
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            lon = position.coords.longitude
            lat = position.coords.latitude

            // ID API
            const api_id = "d745881a8a1897a666f58641b5a627d2"
            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_id}`

            fetch(url_base)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok")
                    }
                    return res.json()
                })
                .then(data => {
                    console.log("Esta es la data")
                    console.log(data)

                    if (temperature && summary && loc) {
                        temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C"
                        summary.textContent = data.weather[0].description
                        loc.textContent = data.name + ", " + data.sys.country
                    }
                })
                .catch(error => {
                    console.error("Fetch error:", error)
                })
        }, error => {
            console.error("Geolocation error:", error)
        })
    } else {
        console.error("Geolocation is not supported by this browser.")
    }
})


// Función para obtener y mostrar un chiste
function readJoke() {
    fetch(API_URL, {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then((joke: { joke: string }) => {       
        console.log(`${joke.joke}`)
        //Imprimir por pantalla el chiste
        const jokePlaceholder = document.querySelector("#jokePlaceholder")
        if (jokePlaceholder) {
            jokePlaceholder.textContent = joke.joke
        }

        // Almacena el chiste actual
        currentJoke = joke.joke

        // Resetea y configura los botones de puntuación
        setupScoreButtons()
    })
    .catch((error: Error) => console.error('Error fetching joke:', error))
}

// Función para los botones de puntuación
function setupScoreButtons() {
    let score: number | null = null

    const scoreButtons = document.querySelectorAll(".score-button")

    scoreButtons.forEach(button => {
        button.addEventListener("click", () => {
            score = parseInt(button.textContent!)            
        })
    })

    // Guarda el reporte cada vez que se hace clic en "Siguiente chiste"
    nextButton?.addEventListener("click", () => {
        if (currentJoke !== null) {
            const report = {
                joke: currentJoke,
                date: new Date().toISOString(),
                score
            }
           
            reportAcudits.push(report)

            // Visualización del reporte en consola
            console.log("Report d'acudits:", reportAcudits)

            // Resetea el score para el siguiente chiste
            score = null
        }
    }, { once: true })  // Cuando se añade un event listener con { once: true }, el listener se activará una sola vez y luego se eliminará automáticamente. 
    //En este contexto se utiliza para asegurar que el listener, que agrega un reporte al array reportAcudits, se ejecute una sola vez por cada clic en el botón "Siguiente chiste".
}

if (nextButton) {
    nextButton.addEventListener("click", readJoke)
}

readJoke()