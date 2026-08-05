


async function fetchWeather(city){
   const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=7`)
         const data = await response.json();
         console.log(data);
   
         if(data.error){
            
            throw new Error(data.error.message);
         }
         return data;
}

async function FetchAIRecommendations(data)
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
