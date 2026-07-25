let temperature = document.getElementById("temperature");
let cityName = document.getElementById("city-name");
let weatherCondition = document.getElementById("weather-condition");
let weatherIcon = document.getElementById("weather-icon")
let searchInput = document.getElementById("search-input");



async function getWeather(city){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=82c6260c88cb444aa5604743262507&q=${city}`)
    const data = await response.json();
    temperature.innerText = data.current.temp_c + "°";
    cityName.innerText = data.location.name + ", " + data.location.country;
    weatherCondition.innerText = data.current.condition.text;
    console.log(data);
}

getWeather("Ghaziabad");


