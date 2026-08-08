

async function fetchWeather(city){
   const response = await fetch(`http://localhost:3000/weather/${city}`);

   return await response.json();
}


async function fetchAIRecommendations(data)
{
   const response = await fetch("http://localhost:3000/recommendations",{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify({
         temperature:data.current.temp_c,
         humidity:data.current.humidity,
         condition:data.current.condition.text,
         wind:data.current.wind_kph,
         uv:data.current.uv,
         visibility:data.current.vis_km
      })
   }
);
   return await response.json();

   // dailyBrief.innerText = result.brief;
   // weatherScore.innerText = result.score + "/100";
   // weatherStatus.innerText = result.score >= 85 ? "⭐⭐⭐⭐⭐ Excellent" :
   //                           result.score >= 70 ? "⭐⭐⭐⭐ Good" :
   //                           result.score >= 50 ? "⭐⭐⭐ Fair" :
   //                           "⭐⭐ Poor";

   // document.getElementById("healthTips").innerHTML = `<li>${result.health}</li>`;
   // document.getElementById("travelTips").innerHTML = `<li>${result.travel}</li>`;
   // document.getElementById("foodSet").innerHTML = `<li>${result.food}</li>`                        
}

async function fetchCityImage(city,country){
   const response = await fetch(
      `http://localhost:3000/city-image/${encodeURIComponent(city)}/${encodeURIComponent(country)}`
   );
   return await response.json();
   
}