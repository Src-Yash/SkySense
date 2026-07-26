let temperature = document.getElementById("temperature");
let cityName = document.getElementById("city-name");
let weatherCondition = document.getElementById("weather-condition");
// let weatherRain = document.getElementById("weather-condition-icon");
let weatherIcon = document.getElementById("weather-icon")
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let humidityElement = document.getElementById("humidity");
let humiditylevel = document.getElementById("humidityLevel");

function resetWeather(){
   temperature.innerText = "0°";
   cityName.innerText = "--";
   weatherCondition.innerText = "--";
   // weatherRain.innerText="--";
   weatherIcon.src = "assets/weather/default.png";

}


function searchWeather(){
   const city = searchInput.value.trim();

   if(city === ""){
      alert("Please enter the city");
      resetWeather();
      return;
   }

   getWeather(city);
}
searchBtn.addEventListener("click",searchWeather);

searchInput.addEventListener("keydown",(event) => {
   if(event.key==="Enter")
     { 
      searchWeather();
     }
});

function getHumidity(humidity){
   if(humidity<30)
      return "low";
   else if(humidity<=60)
      return "Normal";
   else if(humidity<=80)
      return "High";
   else
      return "Very High";  
   
}

async function getWeather(city){

   try{
   const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=82c6260c88cb444aa5604743262507&q=${city}`);
   
   const data = await response.json();
   if(data.error){
      alert(data.error.message);
      resetWeather();
      return;
   }
    temperature.innerText = data.current.temp_c+"°";
    cityName.innerText = data.location.name + "," + data.location.country;
    weatherCondition.innerText = data.current.condition.text;
   //  weatherRain.innerText = data.value;
    console.log(data);
    weatherIcon.src = `https:${data.current.condition.icon}`;
    const humidityValue = data.current.humidity;
    humidityElement.innerText = data.current.humidity + "%";
    humiditylevel.innerText = getHumidity(humidityValue);
   }

    catch(error){
      alert("Please enter a valid city");
      
      console.log(error);
    }
}


getWeather("New Delhi");


