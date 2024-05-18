const API_URL: string = "https://icanhazdadjoke.com";
const nextButton: HTMLButtonElement | null = document.querySelector("#nextButton")

const reportAcudits: { joke: string; date: string; score: number | null; }[] = []

// Variable para almacenar el chiste actual
let currentJoke: string | null = null

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
        setupScoreButtons();
    })
    .catch((error: Error) => console.error('Error fetching joke:', error));
}

// Función para configurar los botones de puntuación
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
            };

            // Subida al array del report
            reportAcudits.push(report)

            // Visualización del reporte en consola
            console.log("Report d'acudits:", reportAcudits);

            // Resetea el score para el siguiente chiste
            score = null
        }
    }, { once: true })  // Cuando se añade un event listener con { once: true }, el listener se activará una sola vez y luego se eliminará automáticamente. En este contexto se utiliza para asegurar que el listener que agrega un reporte al array reportAcudits se ejecute una sola vez por cada clic en el botón "Siguiente chiste".
}

if (nextButton) {
    nextButton.addEventListener("click", readJoke);
}

readJoke()