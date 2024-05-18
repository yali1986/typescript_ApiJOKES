"use strict";
const API_URL = "https://icanhazdadjoke.com";
const nextButton = document.querySelector("#nextButton");
// Inicializar el array de reportes de usuarios fuera de la función para que persista entre clicks
const reportAcudits = [];
// Variable para almacenar el chiste actual
let currentJoke = null;
// Función para obtener y mostrar un chiste
function readJoke() {
    fetch(API_URL, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((joke) => {
        //console.clear();
        console.log(`${joke.joke}`);
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
// Función para configurar los botones de puntuación
function setupScoreButtons() {
    let score = null;
    const scoreButtons = document.querySelectorAll(".score-button");
    scoreButtons.forEach(button => {
        button.addEventListener("click", () => {
            score = parseInt(button.textContent);
            //console.log(`Score actualizado a: ${score}`);
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
            // Subida al array del report
            reportAcudits.push(report);
            // Visualización del reporte en consola
            console.log("Report d'acudits:", reportAcudits);
            // Resetea el score para el siguiente chiste
            score = null;
        }
    }, { once: true });
}
if (nextButton) {
    nextButton.addEventListener("click", readJoke);
}
// Llama a readJoke al cargar la página por primera vez
readJoke();
// const API_URL:string = "https://icanhazdadjoke.com"
// const nextButton:HTMLButtonElement | null = document.querySelector("#nextButton")
// function readJoke() {
//      fetch(API_URL, {
//         headers: {
//           "Accept": "application/json"    
//         }
//       })
//         .then(res => res.json())
//         .then((joke: {joke: string}) => {
//             console.clear()
//             console.log(`${joke.joke}`)
//             const jokePlaceholder = document.querySelector("#jokePlaceholder");
//             if (jokePlaceholder) {
//                 jokePlaceholder.textContent = joke.joke
//                 }
//         })
//         .catch((error: Error) => console.error('Error fetching joke:', error))
// }
// if(nextButton){
//     nextButton.addEventListener("click", readJoke, generadorReports)
// }
// readJoke()
// // necesito que este código se ejecute después del click en Seguent acudit
// function generadorReports (){  
// //declaración de score. El valor inicial es null
// let score:number | null = null
// //Array de reportes de usuarios
// const reportAcudits: { joke: string; date: string; score: number | null; }[] = []
// //selección de botones de score
// const scoreButtons = document.querySelectorAll(".score-button")
// //Iteración por botones de score. Si no hay evento de click tomará valor null establecido en la declaración
//     scoreButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             score = parseInt(button.textContent!)                    
//         })
//     })
// //declaración de objeto report
//      const report = {
//         joke: "esta",
//         date: new Date().toISOString(),
//         score
//     }
//      //Subida al array del report
//     reportAcudits.push(report)
//     //Visualización
//     console.log("Report d'acudits:", reportAcudits)
// }
// if(nextButton){
//     nextButton.addEventListener("click", generadorReports)
// }
// // generadorReports ()
// const API_URL:string = "https://icanhazdadjoke.com"
// const nextButton:HTMLButtonElement | null = document.querySelector("#nextButton")
// en este momento del desarrollo del código cuando el user evalúa un chiste está evaluando el chiste que saldrá en pantalla, no el que evaluó. 
//De golpe se suben dos elementos al array vacío de reportAcudits
// let score:number | null = null
// const reportAcudits: { joke: string; date: string; score: number | null; }[] = []
// function readJoke() {
//      fetch(API_URL, {
//         headers: {
//           "Accept": "application/json"    
//         }
//       })
//         .then(res => res.json())
//         .then((joke: {joke: string}) => {
//             console.clear()
//             console.log(`${joke.joke}`)
//             const scoreButtons = document.querySelectorAll(".score-button")
//             scoreButtons.forEach(button => {
//                 button.addEventListener("click", () => {
//                     score = parseInt(button.textContent!)                    
//                 })
//             })
//              const acudit = {
//                 joke: joke.joke,
//                 date: new Date().toISOString(),
//                 score
//             }
//             reportAcudits.push(acudit)
//             console.log("Report d'acudits:", reportAcudits)
//             const jokePlaceholder = document.querySelector("#jokePlaceholder");
//             if (jokePlaceholder) {
//                 jokePlaceholder.textContent = joke.joke
//                 }
//         })
//         .catch((error: Error) => console.error('Error fetching joke:', error))
// }
// if(nextButton){
//     nextButton.addEventListener("click", readJoke)
// }
// readJoke()
