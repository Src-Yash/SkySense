const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {GoogleGenAI} = require("@google/genai");

const app = express();

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from SkySense Backend!");
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
    .replace(/```json/g,"")
    .replace(/```/g,"")
    .trim();
  
    if (!response.ok) {
    const error = await response.json();
    console.error(error);
    alert("AI service is temporarily unavailable. Please try again in a minute.");
    return;
    
}

    const result = await response.json();
    res.json(aiData);
  }

  catch(error){
    console.error(error);

    res.status(500).json({
        error: JSON.stringify(error)
    });
  }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
