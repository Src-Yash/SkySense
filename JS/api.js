const API_BASE_URL = "https://skysense-9udy.onrender.com";

async function fetchWeather(city){
   const response = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(city)}`);

   return await response.json();
}


async function fetchAIRecommendations(data)
{
   const response = await fetch(`${API_BASE_URL}/recommendations`,{
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
                        
}

async function fetchCityImage(city,country){
   const response = await fetch(
      `${API_BASE_URL}/city-image/${encodeURIComponent(city)}/${encodeURIComponent(country)}`
   );
   return await response.json();
   
}