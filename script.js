async function getWeather(){
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=82c6260c88cb444aa5604743262507&q= Ghaziabad")
    const data = await response.json();
    console.log(data.current.temp_c);
    console.log(data.current.temp_f);
    console.log(data.current.wind_kph);
    console.log(data.location.country);
    console.log(data);
}

getWeather();