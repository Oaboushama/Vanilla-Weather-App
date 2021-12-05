
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#City");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#Humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#Wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#Date");
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    celsiusTemperature = response.data.main.temp;


    getForecast(response.data.coord);

}


function getForecast(coordinates) {
    let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiURL);
        axios.get(apiURL).then(displayForecast);

    
}




function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
      if (hours < 10) {
        hours = `0 ${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0 ${minutes}`;
    }
    let days=[ "Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    return days[day]
}


function search(city) {
let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayTemperature);

}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");

    let forecast = response.data.daily;

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (Forecastday, index) {
        if (index < 6) {
            forecastHTML = forecastHTML + `
        <div class="col">
            <div class="weather-forecast-date"> ${formatDay(Forecastday.dt)}</div>
         <img src="http://openweathermap.org/img/wn/${Forecastday.weather[0].icon}@2x.png" alt="" width= "42" />
 
            <div class="weather-forecast.temperature">
                <span class="weather-forecast-temperature-max"> ${Math.round(Forecastday.temp.max)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(Forecastday.temp.min)}°</span>
           </div>
        </div>`;
        }

        })

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
    
function handleSubmit(event) {
    event.preventDefault();
    let cityinputElement = document.querySelector("#city-input");
    search(cityinputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function displayFahrnheitTemperature(event) {
    event.preventDefault();
    CelsiusLink.classList.remove("active");
    FahrnheitLink.classList.add("active");

    let fahrnheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrnheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
     FahrnheitLink.classList.remove("active");
    CelsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;


let FahrnheitLink = document.querySelector("#fahrenheit-link");
FahrnheitLink.addEventListener("click", displayFahrnheitTemperature);


let CelsiusLink = document.querySelector("#celsius-link");
CelsiusLink.addEventListener("click", displayCelsiusTemperature);

search("london");
