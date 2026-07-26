let temperature = document.getElementById("temperature");
let cityName = document.getElementById("city-name");
let weatherCondition = document.getElementById("weather-condition");
// let weatherRain = document.getElementById("weather-condition-icon");
let weatherIcon = document.getElementById("weather-icon")
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let humidityElement = document.getElementById("humidity");
let humiditylevel = document.getElementById("humidityLevel");
let windSpeedElement = document.getElementById("windSpeed");
let speedlevelElement = document.getElementById("speedLevel");
let feelsLikeElement = document.getElementById("feelsLike");
let feelsLevel = document.getElementById("feel");
let ctx = document.getElementById("uvChart");
let uvIndexElement = document.getElementById("uvValue");
let visibilityElement = document.getElementById("visibility");
let visibilityLevel = document.getElementById("visible");

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

function getWindLevel(windSpeed) {
    if (windSpeed < 5)
        return "Calm 🌿";
    else if (windSpeed <= 20)
        return "Light Breeze 🍃";
    else if (windSpeed <= 40)
        return "Windy 🌬️";
    else if (windSpeed <= 60)
        return "Strong Wind 💨";
    else
        return "Storm ⚠️";

}

function getFeelsLikeLevel(feelsLike) {
   if (feelsLike < 14)
      return "🥶 Very Cold";
   else if (feelsLike < 27)
      return "🧥 Cool";
   else if (feelsLike < 32)
      return "😊 Pleasant";
   else if (feelsLike < 40)
      return "🥵 Hot";
   else
      return "🔥 Extremely Hot";
}
function getVisibiltyLevel(visibility){
   if(visibility < 1)
      return "Very Poor";
   else if(visibility <= 4)
      return "Poor ";
   else if(visibility <= 10)
      return "Moderate";
   else if(visibility <=20)
      return "Good";
   else
      return "Excellent";

}

// chart for UV index

let uvChart = new Chart(ctx,{
   type:"doughnut",
   data:{
      datasets:[{
         data:[2,9],
         borderWidth:0,
         backgroundColor:["orange","grey"],
         borderRadius:2,
         Animation:{
            duration:1500
         },
         spacing:3
        
      }]
   },
   options:{
      responsive:true,
      rotation:-90,
      circumference:180,
      cutout:"65%",
      plugins:{
         legend:{
            display:false
         },
            tooltip:{
               enabled:false
            }
         }
      
   }
});

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
   const windSpeedValue = data.current.wind_kph;
   windSpeedElement.innerText = data.current.wind_kph + "Km/h";
   speedlevelElement.innerText = getWindLevel(windSpeedValue);

   const feelslikeValue = data.current.feelslike_c;
   feelsLikeElement.innerText = data.current.feelslike_c;
   feelsLevel.innerText = getFeelsLikeLevel(feelslikeValue);

   const uv = data.current.uv;
   uvChart.data.datasets[0].data = [uv,11-uv];
   uvChart.update();
   uvIndexElement.innerText = data.current.uv;

   const visibleIndex = data.current.vis_km;
   visibilityElement.innerText = data.current.vis_km + "Km";
   visibilityLevel.innerText =getVisibiltyLevel(visibleIndex);

   





   }

    catch(error){
      alert("Please enter a valid city");
      
      console.log(error);
    }
}


getWeather("New Delhi");


