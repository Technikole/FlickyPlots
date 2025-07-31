const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const { defineString } = require("firebase-functions/params");
const { GoogleGenerativeAI } = require("@google/generative-ai"); 

// --- API Key Definitions ---
const qlooApiKey = defineString("QLOO_API_KEY");
const qlooApiUrl = defineString("QLOO_API_URL");
const geminiApiKey = defineString("GEMINI_API_KEY");

// ---  Existing getQloo Function (Updated to limit: 10) ---
exports.getQloo = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const qlooRequestBody = {
        filter: {
          type: "urn:entity:movie",
          geocode: { country_code: "US" },
        },
        limit: 25, // for Hackathon
      };

      const apiResponse = await axios.post(
        `${qlooApiUrl.value()}/v2/insights`,
        qlooRequestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": qlooApiKey.value(),
          },
        }
      );

      const cleanedData = apiResponse.data.results.entities.map((movie) => {
        return {
          title: movie.name,
          filmingLocation: movie.properties.filming_location,
          releaseYear: movie.properties.release_year,
          description: movie.properties.description,
          imageUrl: movie.properties.image?.url,
        };
      });

      response.status(200).send(cleanedData);
    } catch (error) {
      console.error("Error in getQloo:", error.response?.data || error.message);
      response.status(500).send("Something went wrong!");
    }
  });
});


// ---  AI Functions ---
exports.getAiTourGuide = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).send('Method Not Allowed');
      }
      
      const { title, location } = request.body;
      if (!title || !location) {
        return response.status(400).send("Missing title or location.");
      }

      const genAI = new GoogleGenerativeAI(geminiApiKey.value());
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

      // //Option 1
      // const prompt = `Act as a creative movie tour guide. For the movie '${title}', filmed in '${location}', generate a short, fun, and imaginative tour idea (2-3 sentences) for a tourist visiting that spot. Make it sound exciting.`;

      // In functions/index.js, inside the getAiTourGuide function

      // Option 2

      // const prompt = `You are a cinematic location scout named 'Flicky.' You've just discovered that the iconic movie '${title}' was filmed in '${location}'. Write a brief, dramatic, and exciting "director's note" (2-4 sentences) for how you would revisit this location for a new film. Use vivid, cinematic language and frame the location as a character in the story.`;

      // Option 3
      const prompt = 'Act as a creative movie tour guide. For the movie '${title}', filmed in '${location}', generate a short, imaginative tour pitch (2-3 sentences) for a tourist visiting that spot today. Make it sound intriguing, cinematic, and describe what the visitor might experience now — blending the movie’s atmosphere with the present-day setting.';

      const result = await model.generateContent(prompt);
      const aiResponse = await result.response;
      const text = aiResponse.text();

      response.status(200).send({ tourGuideText: text });

    } catch (error) {
      console.error("Error in getAiTourGuide:", error);
      response.status(500).send("Failed to generate AI content.");
    }
  });
});