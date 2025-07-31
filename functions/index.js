const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const { defineString } = require("firebase-functions/params");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- API Key Definitions ---
const qlooApiKey = defineString("QLOO_API_KEY");
const qlooApiUrl = defineString("QLOO_API_URL");
const geminiApiKey = defineString("GEMINI_API_KEY");

// --- Service Account Email ---
const SERVICE_ACCOUNT_EMAIL = "flickyplots-runner@flickyplots.iam.gserviceaccount.com";

// --- Cloud Functions ---

// CORRECT SYNTAX: Options object is the first argument
exports.getQloo = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
  cors(request, response, async () => {
    try {
      const qlooRequestBody = {
        filter: {
          type: "urn:entity:movie",
          geocode: { country_code: "US" },
        },
        limit: 25,
      };
      const apiResponse = await axios.post(
        `${qlooApiUrl.value()}/v2/insights`,
        qlooRequestBody,
        { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } }
      );
      const cleanedData = apiResponse.data.results.entities.map((movie) => ({
        title: movie.name,
        filmingLocation: movie.properties.filming_location,
        releaseYear: movie.properties.release_year,
        description: movie.properties.description,
        imageUrl: movie.properties.image?.url,
      }));
      response.status(200).send(cleanedData);
    } catch (error) {
      console.error("Error in getQloo:", error.response?.data || error.message);
      response.status(500).send("Something went wrong!");
    }
  });
});


exports.getAiTourGuide = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
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
      const prompt = `Act as a creative movie tour guide. For the movie '${title}', filmed in '${location}', generate a short, imaginative tour pitch (2-3 sentences) for a tourist visiting that spot today. Make it sound intriguing, cinematic, and describe what the visitor might experience now — blending the movie’s atmosphere with the present-day setting.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      response.status(200).send({ tourGuideText: text });
    } catch (error) {
      console.error("Error in getAiTourGuide:", error);
      response.status(500).send("Failed to generate AI content.");
    }
  });
});