const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {GoogleGenAI} = require("@google/genai");

const app = express();

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from SkySense Backend!");
});


// weather api

app.get("/weather/:city", async (req, res) => {
    try {
        
        const city = req.params.city;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=7`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// new api

app.post("/recommendations",async (req,res) => {
  
  console.log(req.body);
  const {
    temperature,
    humidity,
    condition,
    wind,
    uv,
    visibility
  } = req.body;

  const prompt = `
                You are an intelligent weather assistant.
                
                Current Weather
                
                Temperature: ${temperature}°C
                Humidity: ${humidity}%
                Condition: ${condition}
                Wind Speed: ${wind} km/h
                UV Index: ${uv}
                Visibility: ${visibility} km
                
                Generate ONLY valid JSON.
                
                {
                  "brief":"",
                  "score":0,
                  "health":"",
                  "travel":"",
                  "food":""
                }
                `;

  try{
    console.log("MODEL USED: gemini-3.5-flash");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents:prompt
    });
    
    console.log(response.text);


    let text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  
    const aiData = JSON.parse(text);
    res.json(aiData);

  }

  catch(error){
    console.error(error);

    res.status(500).json({
        error: error.message
    });
  }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
