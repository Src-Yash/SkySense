// Helper Functions


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


function getVisibilityLevel(visibility){
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


function resetWeather(){
   temperature.innerText = "0°";
   cityName.innerText = "--";
   weatherCondition.innerText = "--";
   // weatherRain.innerText="--";
   weatherIcon.src = "assets/img24.jpg";
}   

function showError(message){
   errorBox.innerText = message;
   errorBox.style.display = "block";

}

function hideError(){
   errorBox.style.display = "none";
}