
function displayTemperature(response) {
    console,console.log(response.data.main.temp);
}


let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);