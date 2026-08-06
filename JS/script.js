const temperature = document.getElementById("temperature");
const cityName = document.getElementById("city-name");
const weatherCondition = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon")
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const humidityElement = document.getElementById("humidity");
const humiditylevel = document.getElementById("humidityLevel");
const windSpeedElement = document.getElementById("windSpeed");
const speedlevelElement = document.getElementById("speedLevel");
const ctx = document.getElementById("uvChart");
const uvIndexElement = document.getElementById("uvValue");
const visibilityElement = document.getElementById("visibility");
const visibilityLevel = document.getElementById("visible");
const pressureElement = document.getElementById("pressure");
const pressurelevel = document.getElementById("pressureLevel");
const dayElement = document.getElementById("todaysDay");
const timeElement = document.getElementById("todaysTime");
const forecastContainer = document.querySelector(".forecast-container");
const sunriseElement = document.getElementById("Sunrise");
const sunsetElement =document.getElementById("Sunset");
const celsiElement = document.getElementById("celsi");
const farhenElement = document.getElementById("farhen")
let currentUnit = "C";
let weatherData = null;
const cityImage = document.getElementById("cityImage");
const forecastPage=document.getElementById("forecastPage")
const aboutPage=document.getElementById("aboutPage")
const forecastBtn = document.querySelector(".forecastBtn");
const aboutBtn = document.querySelector(".aboutBtn")
const dailyBrief = document.getElementById("dailyBrief")
const weatherScore = document.getElementById("weatherScore");
const weatherStatus = document.getElementById("weatherStatus");
const healthTips = document.getElementById("healthTips");
const travelTips = document.getElementById("travelTips");
const foodSet = document.getElementById("foodSet");
const loader = document.getElementById("loader");
let errorBox = document.getElementById("errorBox");
const locationBtn = document.querySelector(".fa-location-crosshairs");
const recentDropdown = document.getElementById("recentDropdown");
const forecastButton = document.getElementById("forecastButton");
const aboutButton = document.getElementById("aboutButton");



let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function renderSearchHistory(){

    const history =
    JSON.parse(localStorage.getItem("searchHistory")) || [];
    recentDropdown.innerHTML = "";
    history.forEach(city=>{
        const item=document.createElement("div");
        item.className="recent-item";
        item.innerHTML=`📍 ${city}`;
        item.onclick=()=>{
            searchInput.value=city;
            recentDropdown.style.display="none";
            getWeather(city);
        };
        recentDropdown.appendChild(item);

    });

}

searchInput.addEventListener("focus",()=>{

    renderSearchHistory();
    recentDropdown.style.display="block";
});


document.addEventListener("click",(e)=>{
    if(!document.querySelector(".search-container").contains(e.target)){
        recentDropdown.style.display="none";
    }
});


function saveSearch(city){
    city = city.trim();
    if(city==="" || city==="null") return;
    let history =
    JSON.parse(localStorage.getItem("searchHistory")) || [];
    history = history.filter(item=>item!==city);
    history.unshift(city);
    history = history.slice(0,5);
    localStorage.setItem(
        "searchHistory",
        JSON.stringify(history)
    );
}

locationBtn.addEventListener("click", getCurrentLocation);


function getCurrentLocation(){
   if(!navigator.geolocation){
      showError("Geolocation is not supported by this browser.");
      return;
   }
   loader.style.display = "block";
   
// so this is the function used to locate the position for the updation
   navigator.geolocation.getCurrentPosition(
      successLocation,
      errorLocation
   );
}

   forecastBtn.addEventListener("click",showForecast);
   aboutBtn.addEventListener("click",showAbout);
      
   showForecast();


   celsiElement.addEventListener("click", () => {
    currentUnit = "C";
   
    if(weatherData){
      updateTemperature(weatherData);
      updateForecast(weatherData);
    }
    celsiElement.classList.add("active")
    farhenElement.classList.remove("active")
   
   });     

   farhenElement.addEventListener("click", () => {
    currentUnit = "F";
    
    if(weatherData){
        updateTemperature(weatherData);
        updateForecast(weatherData);
    }

    farhenElement.classList.add("active");
    celsiElement.classList.remove("active");
    celsiElement.classList.remove("unitC");
    celsiElement.classList.add("unit");

   }); 
   

function searchWeather(){
   const city = searchInput.value.trim();
   if(city === ""){
    showError("Please enter a city name.");
    searchInput.focus();
    return;
}

hideError();
   getWeather(city);
}   

searchBtn.addEventListener("click",searchWeather);
searchInput.addEventListener("keydown",(event) => {
   if(event.key==="Enter")
     { 
        searchWeather();
      }
});

searchInput.addEventListener("input", () => {
    hideError();
});

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

   searchBtn.disabled = true;
   searchInput.disabled = true;
   loader.style.display = "block";
   searchInput.placeholder = "Getting your location... ";
   document.body.style.cursor = "wait";
   
   try{

        const data = await fetchWeather(city);
        console.log(data);

        saveSearch(city);

        searchInput.value =data.location.name;

        weatherData = data;

        updateSidebar(data);

        updateBackground(data.current.condition.text);

        const cityImageData = await fetchCityImage(
         data.location.name,
         data.location.country
        );

        console.log(cityImageData);
        
        updateCityImage(cityImageData.image);

        updateHighlights(data);

        updateDateTime(data);

        updateTemperature(data);

        updateForecast(data);

        const ai = 
        await FetchAIRecommendations(data);
        console.log(ai);

        updateAboutYou(ai);

    }

   catch(error){

      console.error(error);

      if(error.message.includes("No matching location")){
          showError("City not found. Please try another city.");
          resetWeather();
      }
      else{
          showError("Unable to update the About You section.");
      }

      // resetWeather();
   }


    finally{
        loader.style.display="none";
        searchBtn.style.opacity = "1";
        searchInput.disabled = false;
        
        searchBtn.disabled = false;
        searchInput.placeholder = "Search for places...";
        document.body.style.cursor = "default";
    }
    }

// async function updateCityImage(city){
//    const image = await fetch(`http://apiunsplash.com/search/photos?query=${city}&client_id=`)
   
// }

async function successLocation(position){
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;

   await getWeather(`${latitude},${longitude}`);
}


function errorLocation(error){
   loader.style.display = "none";
   switch(error.code){
      case error.PERMISSION_DENIED:
         showError("Location permission denied");
         break;
      
      case error.POSITION_UNAVAILABLE:
         showError("Location Unavailable");
         break;
      
      case error.TIMEOUT:
         showError("Location request time out");
         break;
      
      default:
         showError("Unable to get your location");
   }
}

renderSearchHistory();
getWeather("New delhi");


