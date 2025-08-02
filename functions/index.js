// FlickyPlots Zombie Apocalypse - index.js
// other editions use archive/old index-js.txt

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

// getMovies
// In functions/index.js, replace getApocalypseMovies with this:

exports.getMovies = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
  cors(request, response, async () => {
    try {
      // Get filters from the frontend request body
      const { searchTerm, locationQuery, releaseYearMin } = request.body;

      let apiResponse;

      // If the user is searching for a specific movie title, use the /search endpoint
      if (searchTerm) {
        apiResponse = await axios.get(`${qlooApiUrl.value()}/search`, {
          headers: { "x-api-key": qlooApiKey.value() },
          params: {
            q: searchTerm,
            type: "movie",
            limit: 50
          }
        });
      } else {
        // Otherwise, build a request for the /insights endpoint for thematic/attribute filtering
        let qlooRequestBody = {
          filter: { "type": "urn:entity:movie" },
          query: {
            "domain": "entity",
            "query": [{ "type": "qloo-taste", "search_term": "zombie apocalypse movies" }]
          },
          limit: 50
        };

        // Dynamically add other filters if they exist
        if (locationQuery) {
          qlooRequestBody.signal = { location: { query: locationQuery } };
        }
        if (releaseYearMin) {
          qlooRequestBody.filter.release_year = { min: parseInt(releaseYearMin) };
        }

        apiResponse = await axios.post(
          `${qlooApiUrl.value()}/v2/insights`,
          qlooRequestBody,
          { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } }
        );
      }

      // The response structure is different for /search vs /insights
      const movies = apiResponse.data.results ? apiResponse.data.results.entities : apiResponse.data.data;

      const cleanedData = movies.map((movie) => ({
        title: movie.name,
        filmingLocation: movie.properties.filming_location,
        releaseYear: movie.properties.release_year,
        description: movie.properties.description,
        imageUrl: movie.properties.image?.url,
      }));

      response.status(200).send(cleanedData);

    } catch (error) {
      console.error("Error in getMovies:", error.response?.data || error.message);
      response.status(500).send("Something went wrong!");
    }
  });
});


// getApocalypseMovies 
// exports.getApocalypseMovies = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
//   cors(request, response, async () => {
//     try {
//    const qlooRequestBody = {
//         "filter": {
//           "type": "urn:entity:movie"
//         },
//         "query": {
//           "domain": "entity",
//           "query": [{
//             "type": "qloo-taste",
//             "search_term": "zombie apocalypse movies",
//             "result_entity_type": "movie" // This was the critical missing piece
//           }]
//         },
//         "limit": 50
//       };

//       const apiResponse = await axios.post(
//         `${qlooApiUrl.value()}/v2/insights`,
//         qlooRequestBody,
//         { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } }
//       );

//       const cleanedData = apiResponse.data.results.entities.map((movie) => ({
//         title: movie.name,
//         filmingLocation: movie.properties.filming_location,
//         releaseYear: movie.properties.release_year,
//         description: movie.properties.description,
//         imageUrl: movie.properties.image?.url,
//       }));

//       response.status(200).send(cleanedData);

//     } catch (error) {
//       console.error("Error in getApocalypseMovies:", error.response?.data || error.message);
//       response.status(500).send("Something went wrong!");
//     }
//   });
// });

exports.getAiTourGuide = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
  cors(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).send('Method Not Allowed');
      }
      
      const { title, location, releaseYear } = request.body;
      if (!title || !location) {
        return response.status(400).send("Missing title or location.");
      }

      const genAI = new GoogleGenerativeAI(geminiApiKey.value());
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

      const prompt = `You are a cultural recommender. For the movie '${title}' (${releaseYear}), filmed in '${location}', generate a JSON object with three keys: "book", "album", and "pitch".
        - The "book" value should be an object with "title" and "reason" keys for a thematically similar book.
        - The "album" value should be an object with "title" and "reason" keys for a similar album.
        - The "pitch" value should be a string containing a creative 2-3 sentence destination pitch for the location.
        Ensure the output is ONLY the raw JSON object, with no other text or markdown.`;

      const result = await model.generateContent(prompt);
      let text = result.response.text();
      
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      const jsonData = JSON.parse(text);
      response.status(200).send(jsonData);

    } catch (error) {
      console.error("Error in getApocalypseMovies:", error);
      response.status(500).send("Failed to generate AI content.");
    }
  });
});