
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

}


let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);