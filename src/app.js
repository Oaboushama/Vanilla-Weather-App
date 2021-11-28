
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#City");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#descrition");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#Humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#Wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#Date");
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

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


let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
let city="London"
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);