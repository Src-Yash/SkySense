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

   cityImage.src=image;

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