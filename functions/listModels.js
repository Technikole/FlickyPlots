// This script lists available Gemini models that support our use case.

require('dotenv').config(); // Loads variables from .env file
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
 
async function listAvailableModels() {
  console.log("Fetching available Gemini models...");
  try {
    const { models } = await genAI.listModels();
    
    console.log("--------------------");
    console.log("Models supporting 'generateContent':");
    
    for (const model of models) {
      if (model.supportedGenerationMethods.includes("generateContent")) {
        console.log(`- ${model.name}`);
      }
    }
    console.log("--------------------");

  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listAvailableModels();