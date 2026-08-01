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
// let feelsLikeElement = document.getElementById("feelsLike");
// let feelsLevel = document.getElementById("feel");
let ctx = document.getElementById("uvChart");
let uvIndexElement = document.getElementById("uvValue");
let visibilityElement = document.getElementById("visibility");
let visibilityLevel = document.getElementById("visible");
let pressureElement = document.getElementById("pressure");
let pressurelevel = document.getElementById("pressureLevel");
let dayElement = document.getElementById("todaysDay");
let timeElement = document.getElementById("todaysTime");
let forecastContainer = document.querySelector(".forecast-container");
let sunriseElement = document.getElementById("Sunrise");
let sunsetElement =document.getElementById("Sunset");
let celsiElement = document.getElementById("celsi");
let farhenElement = document.getElementById("farhen")
let currentUnit = "C";
let weatherData = null;
let cityImage = document.getElementById("cityImage");

let forecastPage=document.getElementById("forecastPage")
let aboutPage=document.getElementById("aboutPage")

let forecastBtn = document.querySelector(".forecastBtn");
let aboutBtn = document.querySelector(".aboutBtn")
let dailyBrief = document.getElementById("dailyBrief")
let weatherScore = document.getElementById("weatherScore");
let weatherStatus = document.getElementById("weatherStatus");

function showForecast(){
   forecastPage.style.display="block";
   aboutPage.style.display="none";
   forecastBtn.classList.add("activeTab");
   aboutBtn.classList.remove("activeTab");
}

function showAbout(){
   forecastPage.style.display="none";
   aboutPage.style.display="grid";
   aboutBtn.classList.add("activeTab");
   forecastBtn.classList.remove("activeTab");
}

forecastBtn.addEventListener("click",showForecast);
aboutBtn.addEventListener("click",showAbout);

showForecast();


celsiElement.addEventListener("click", () => {
    currentUnit = "C";
   //  celsiElement.style.backgroundColor="black";
    celsiElement.classList.add("active")
    farhenElement.classList.remove("active")
  


   //  celsiElement.classList.
    updateTemperature();
});

farhenElement.addEventListener("click", () => {
    currentUnit = "F";

    farhenElement.classList.add("active");
    celsiElement.classList.remove("active");
   //  farhenElement.style.background="#FFC5AA";
    updateTemperature();
});


// section ABOUT YOU Functions


function generateDailyBrief(data){
   const temp = data.current.temp_c;
   const humidity = data.current.humidity;
   const uv = data.current.uv;
   const wind = data.current.wind_kph;
   const condition = data.current.condition.text;
   let message = "";
   if(temp>=38){
      message+="It's going to be extremly hot today, stay hydrated.<br>"
   }
   else if(temp>=30){
      message+="It's a warm day today.<br>";
   }
  
   else{
      message+="the weather is pleasant today.<br>";
   }
   if(uv>=8){
      message+="UV is ver high. Wear sunscreen.<br>"
   }
   if(humidity>80){
      message+="Humidity is high. Wear sunscreen. <br>";
   }
   if(wind>35){
      message+="Strong winds are expected.<br>";
   }
   if(condition.includes("Rain")){
      message+="Carry an umbrella today.<br>";
   }

   dailyBrief.innerHTML=message;


};

function calculateWeatherScore(data){
   let score=100;
   const temp = data.current.temp_c;
   
      if(temp > 38)
         score -= 25;
      else if(temp > 34)
         score -= 15;
      else if(temp < 10)
         score -= 20;
   
   const humidity = data.current.humidity;

      if(humidity>85){
         score-=15;
      }

   const uv=data.current.uv; 
      if(uv>8){
         score-=15;
      }
   const wind = data.current.wind_kph;
   
   if(wind > 40)
       score -= 20;

   const condition = data.current.condition.text;

   if(condition.includes("Rain"))
       score -= 15;

   if(score<0){
      score=0;
   }

   let status = "";

if(score >= 90)
    status = "⭐⭐⭐⭐⭐ Excellent";

else if(score >= 75)
    status = "⭐⭐⭐⭐ Very Good";

else if(score >= 60)
    status = "⭐⭐⭐ Fair";

else if(score >= 40)
    status = "⭐⭐ Poor";

else
    status = "⭐ Stay Indoors";


weatherScore.innerText = score + "/100";
weatherStatus.innerText = status;

      
}


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
        return "Calm";
    else if (windSpeed <= 20)
        return "Light Breeze";
    else if (windSpeed <= 40)
        return "Windy ";
    else if (windSpeed <= 60)
        return "Strong Wind";
    else
        return "Storm";

}


function updateTemperature(){
   if(!weatherData) return;
   if(currentUnit === "C"){
      temperature.innerText = `${weatherData.current.temp_c}°C`;
      forecastContainer.innerHTML="";
      weatherData.forecast.forecastday.forEach(forecast => {
         const card = document.createElement("div");
         card.classList.add("forecast-card");
         card.innerHTML=`
         <p>${new Date(forecast.date).toLocaleDateString("en-US",{
            weekday:"short"
         })}</p>
         <img src="${forecast.day.condition.icon}" alt="">
         <p>${forecast.day.maxtemp_c}°C</p>
         <hr>
         <p>${forecast.day.mintemp_c}°C</p>
         `;
         forecastContainer.appendChild(card);
      });

   }
   else{
      temperature.innerText=`${weatherData.current.temp_f}°F`;
      forecastContainer.innerHTML="";
      weatherData.forecast.forecastday.forEach(forecast =>{
         const card = document.createElement("div");
         card.classList.add("forecast-card");
         card.innerHTML=`
         <p>${new Date(forecast.date).toLocaleDateString("en-US", {
                    weekday: "short"
                })}</p>
                <img src="${forecast.day.condition.icon}" alt="">
                <p>${forecast.day.maxtemp_f}°F</p>
                <hr>
                <p>${forecast.day.mintemp_f}°F</p>
                `
         forecastContainer.appendChild(card);
      });

   }
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


function getPressureLevel(pressure){
   if(pressure < 1000)
      return "Low";
   else if(pressure <= 1020)
      return "Normal";
   else if(pressure <= 1030)
      return "High";
   else{
      return  "Very High";
   }
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
         animation:{
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
   const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=82c6260c88cb444aa5604743262507&q=${city}&days=7`)
   const data = await response.json();
   console.log(data);

   // console.log(data.forecast.forecastday[0].day.mintemp_f);
   
   
   if(data.error){
      alert(data.error.message);
      resetWeather();
      return;
   }
   // temperature.innerText = data.current.temp_c+"°";
   cityName.innerText = data.location.name + "," + data.location.country;
   weatherCondition.innerText = data.current.condition.text;
   //  weatherRain.innerText = data.value;
   // console.log(data);
   weatherIcon.src = `https:${data.current.condition.icon}`;
   const humidityValue = data.current.humidity;
   humidityElement.innerText = data.current.humidity + "%";
   humiditylevel.innerText = getHumidity(humidityValue);
   const windSpeedValue = data.current.wind_kph;
   windSpeedElement.innerText = data.current.wind_kph + "Km/h";
   speedlevelElement.innerText = getWindLevel(windSpeedValue);
   
   // const feelslikeValue = data.current.feelslike_c;
   // feelsLikeElement.innerText = data.current.feelslike_c;
   // feelsLevel.innerText = getFeelsLikeLevel(feelslikeValue);
   
   const uv = data.current.uv;
   uvChart.data.datasets[0].data = [uv,11-uv];
   uvChart.update();
   uvIndexElement.innerText = data.current.uv;
   
   const visibleIndex = data.current.vis_km;
   visibilityElement.innerText = data.current.vis_km + "Km";
   visibilityLevel.innerText =getVisibiltyLevel(visibleIndex);
   
   
   const press = data.current.pressure_mb;
   pressureElement.innerText = data.current.pressure_mb + "mb";
   pressurelevel.innerText = getPressureLevel(press);
   
   // time and day updation
   
   timeElement.innerText = data.current.last_updated;
   
   const date = new Date(data.location.localtime);
   const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
   ];
   
   dayElement.innerText = days[date.getDay()];
   
   // forecast Container
   weatherData = data;
   updateTemperature();
   // forecastContainer.innerHTML="";
   // for(let i=0 ; i < data.forecast.forecastday.length; i++){
   //    const forecast = data.forecast.forecastday[i];
   //    const dayName = new Date(forecast.date).toLocaleDateString("en-US", {
   //       weekday: "short"
   //    });
   //    const card = document.createElement("div");
   //    card.classList.add("forecast-card");
   //    forecastContainer.appendChild(card);
   //    card.innerHTML = `
   //        <p>${dayName}</p>
   //        <img src="https:${forecast.day.condition.icon}" alt="Weather">
   //        <h3>${forecast.day.mintemp_c}°C - ${forecast.day.maxtemp_c}°C</h3>
      
   //    `;
   //    forecastContainer.appendChild(card);

      // sunrise & sunset
      
      
   sunriseElement.innerText=data.forecast.forecastday[0].astro.sunrise;
      
   sunsetElement.innerText=data.forecast.forecastday[0].astro.sunset;

   generateDailyBrief(data);
   calculateWeatherScore(data);

   // }
 
   }

    catch(error){
      alert("Please enter a valid city");
      
      console.log(error);
    }
}

// async function updateCityImage(city){
//    const image = await fetch(`https://apiunsplash.com/search/photos?query=${city}&client_id=`)
   
// }

async function getAIRecommendations(data){
   const ai=await fetch(`https://generativelanguage.googleapis.com`)
}


getWeather("New Delhi");


