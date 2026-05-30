const apiKey = "81ea55b32f2b470881b55723260205";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

const searchBox = document.querySelector("input")
const searchBtn = document.querySelector("button")
const weatherIcon = document.querySelector(".weather-icon");
const text_temp = document.querySelector(".text_temp");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + "&aqi=yes");
    if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    const data = await response.json();
    
    console.log(data);
    if (data.error) {
    alert("City not found");
    return;
    }

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.floor(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
    text_temp.innerHTML = data.current.condition.text;


    const condition = data.current.condition.text.toLowerCase();

    if(condition.includes("sun")){
        weatherIcon.src = "sun.png"
    }
    else if(condition.includes("overcast")){
        weatherIcon.src = "overcast.png"
    }
    else if(condition.includes("clear")){
        weatherIcon.src = "clear-sky.png"
    }
    else if(condition.includes("drizzle")){
        weatherIcon.src = "drizzle.png"
    }
    else if(condition.includes("cloud")){
        weatherIcon.src = "cloudy.png"
    }
    else if(condition.includes("mist")){
        weatherIcon.src = "mist.png"
    }
    else if(condition.includes("rain")){
        weatherIcon.src = "rain.png"
    }
    else{
        weatherIcon.src = "space.png"
    }
}


searchBtn.addEventListener("click", () => {
    if(searchBox.value.trim() === ""){
        alert("Please enter a city name");
        return;
    }
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (e) => {
    if(e.key == "Enter")
    {
        checkWeather(searchBox.value);
    }
})

