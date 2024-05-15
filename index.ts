const API_URL:string = "https://icanhazdadjoke.com"
const HTMLresponse:HTMLElement | null = document.querySelector("#app")
const nextButton:HTMLButtonElement | null = document.querySelector("#nextButton")


function readJoke():void{
    fetch(API_URL, {
        headers: {
          "Accept": "application/json"    
        }
      })
        .then(res => res.json())
        .then((joke: {joke: string}) => {
            console.clear()
            console.log(`${joke.joke}`)
           
            if(HTMLresponse) { 
                HTMLresponse.innerHTML = `<br>${joke.joke}`}
                
        })
        .catch((error: Error) => console.error('Error fetching joke:', error))
}

if(nextButton){
    nextButton.addEventListener("click", readJoke)
}

readJoke()