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

function updateTemperature(data){
   if(!weatherData) return;
   if(currentUnit === "C"){
      temperature.innerText = `${data.current.temp_c}°C`;
   }
   else{
      temperature.innerText=`${data.current.temp_f}°F`;
   }
}




function updateSidebar(data){
         cityName.innerText = data.location.name + "," + data.location.country;

         weatherCondition.innerText = data.current.condition.text;

         weatherIcon.src = `https:${data.current.condition.icon}`;
}

function updateCityImage(image){

   cityImage.style.opacity = "0";
   setTimeout(() => {
      cityImage.src=image;
      cityImage.onload = () => {
         cityImage.style.opacity = "1";
      };
      
   },300)

}

function updateHighlights(data){


         const humidityValue = data.current.humidity;
         humidityElement.innerText = data.current.humidity + "%";
         humiditylevel.innerText = getHumidity(humidityValue);
         
         const windSpeedValue = data.current.wind_kph;
         windSpeedElement.innerText = data.current.wind_kph + "Km/h";
         speedlevelElement.innerText = getWindLevel(windSpeedValue);
         
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

}

function updateDateTime(data){
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
         
         sunriseElement.innerText=data.forecast.forecastday[0].astro.sunrise;
            
         sunsetElement.innerText=data.forecast.forecastday[0].astro.sunset;
}


function updateAboutYou(ai){

    dailyBrief.innerText = ai.brief;
    weatherScore.innerText = ai.score + "/100";
    weatherStatus.innerText =
        ai.score >= 85 ? "⭐⭐⭐⭐⭐ Excellent" :
        ai.score >= 70 ? "⭐⭐⭐⭐ Good" :
        ai.score >= 50 ? "⭐⭐⭐ Fair" :
        "⭐⭐ Poor";
    healthTips.innerHTML = `<li>${ai.health}</li>`;
    travelTips.innerHTML = `<li>${ai.travel}</li>`;
    foodSet.innerHTML = `<li>${ai.food}</li>`;
}

function updateForecast(data){
    if(currentUnit === "C"){
      forecastContainer.innerHTML="";
      data.forecast.forecastday.forEach(forecast => {
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
      forecastContainer.innerHTML="";
      data.forecast.forecastday.forEach(forecast =>{
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


function updateBackground(condition){
   stopRain();
   stopClouds();
   stopLightning();


   const main = document.querySelector(".main-content");
   condition = condition.toLowerCase();
   if(condition.includes("sun")){
      main.className = "main-content sunny";
   }
   else if(condition.includes("rain")){
      main.className = "main-content rainy";
   }
   else if(condition.includes("cloud")){
      main.className = "main-content cloudy";
   }
   else if(condition.includes("snow")){
      main.className = "main-content snowy";
   }
   else if(condition.includes("thunder")){
      main.className = "main-content storm";
   }
   else{
      main.className = "main-content";
   }


   if(condition.toLowerCase().includes("rain")){
      createRain();
   }

   if(condition.toLowerCase().includes("cloud")){
      createClouds();
   }
   if(condition.includes("thunder")){
      createLightning();
   }
}

function createRain(){
   const rain = document.querySelector(".rain");
   rain.innerHTML="";
   rain.style.display="block";
   for(let i=0;i<120;i++){
      const drop = document.createElement("div");
      drop.className="drop";
      drop.style.left=Math.random()*100+"vw";
      drop.style.animationDuration=(0.5+Math.random())+"s";
      drop.style.animationDelay=Math.random()+"s";

      rain.appendChild(drop);
   }
}

function stopRain(){
   document.querySelector(".rain").style.display = "none";
}


function createClouds(){

    const container =
    document.querySelector(".cloud-container");

    container.innerHTML="";

    container.style.display="block";

    for(let i=0;i<6;i++){

        const cloud=document.createElement("img");

        cloud.src="assets/weather/pngwing.com.png";

        cloud.className="cloud";

        cloud.style.top=Math.random()*50+"%";

        cloud.style.width=
        (120+Math.random()*120)+"px";

        cloud.style.animationDuration=
        (25+Math.random()*20)+"s";

        cloud.style.animationDelay=
        Math.random()*10+"s";

        container.appendChild(cloud);

    }

}
function stopClouds(){
   document.querySelector(".cloud-container").style.display="none";
}

let lightningInterval;

function createLightning(){

    const flash = document.querySelector(".lightning");
    flash.style.display = "block";
    lightningInterval = setInterval(()=>{
        flash.style.animation="none";
        flash.offsetHeight;
        flash.style.animation="lightningFlash .5s";
    },4000+Math.random()*4000);

}
function stopLightning(){
    clearInterval(lightningInterval);
    const flash = document.querySelector(".lightning");
    flash.style.animation="none";
    flash.style.opacity=0;
}