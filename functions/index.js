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
// Reimplement getQloo with conditional logic to select the right function per call/site
// In functions/index.js

exports.getQloo = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
  cors(request, response, async () => {
    try {
      // Read the custom header to know which site is calling.
      const siteVersion = request.headers['x-site-version'] || 'gmaps';
      let apiResponse;

      // Logic for vZombie using the correct thematic query
      if (siteVersion === 'zombie') {
        const qlooRequestBody = {
          "filter": {
            "type": "urn:entity:movie"
          },
          "query": {
            "domain": "entity",
            "query": [{
              "type": "qloo-taste",
              "search_term": "zombie apocalypse movies",
              "result_entity_type": "movie"
            }]
          },
          "take": 25
        };
        apiResponse = await axios.post(`${qlooApiUrl.value()}/v2/insights`, qlooRequestBody, { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } });

      } else {
        // Logic for vGMaps and vQloo (they use the same simple geocode query)
        const qlooRequestBody = {
          filter: { type: "urn:entity:movie", geocode: { country_code: "US" } },
          limit: 25, // Note: /insights uses limit, /search uses take
        };
        apiResponse = await axios.post(`${qlooApiUrl.value()}/v2/insights`, qlooRequestBody, { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } });
      }

      const movies = apiResponse.data.results.entities;
      const cleanedData = movies.map((movie) => ({
        title: movie.name,
        filmingLocation: movie.properties.filming_location,
        releaseYear: movie.properties.release_year,
        description: movie.properties.description,
        imageUrl: movie.properties.image?.url,
      }));
      response.status(200).send(cleanedData);

    } catch (error) {
      console.error(`Error in getQloo (version: ${request.headers['x-site-version']}):`, error.response?.data || error.message);
      response.status(500).send("Something went wrong!");
    }
  });
});

// getMovies [Critical Failure, zombies overwrite to getQloo = loss of function]
// In functions/index.js

// exports.getMovies = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
//   cors(request, response, async () => {
//     try {
//       const { searchTerm, locationQuery, year, country } = request.body;
//       let apiResponse;

//       // A) If a specific movie title is searched, use the /search endpoint.
//       if (searchTerm) {
//         apiResponse = await axios.get(`${qlooApiUrl.value()}/search`, {
//           headers: { "x-api-key": qlooApiKey.value() },
//           params: { q: searchTerm, type: "movie", take: 25 }
//         });
//       } else {


//         // C)  Back to v2 logic vs wide /search

// exports.getMovies = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
//   cors(request, response, async () => {
//     try {
//       // This is the definitive request body for a thematic search on the /insights endpoint
//       const qlooRequestBody = {
//         "filter": {
//           "type": "urn:entity:movie"
//         },
//         "query": {
//           "domain": "entity",
//           "query": [{
//             "type": "qloo-taste",
//             "search_term": "zombie apocalypse movies",
//             "result_entity_type": "movie"
//           }]
//         },
//         "take": 25
//       };

//       const apiResponse = await axios.post(
//         `${qlooApiUrl.value()}/v2/insights`,
//         qlooRequestBody,
//         { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } }
//       );

//       const movies = apiResponse.data.results.entities;

//       const cleanedData = movies.map((movie) => ({
//         title: movie.name,
//         filmingLocation: movie.properties.filming_location,
//         releaseYear: movie.properties.release_year,
//         description: movie.properties.description,
//         imageUrl: movie.properties.image?.url,
//       }));

//       response.status(200).send(cleanedData);

//     } catch (error) {
//       console.error("Error in getMovies:", error.response?.data || error.message);
//       response.status(500).send("Something went wrong!");
//     }
//   });
// });
//         // B) For all other requests, use the /insights endpoint with a base filter for our theme.
        
//         // let qlooRequestBody = {
//         //   filter: {
//         //     "type": "urn:entity:movie",
//         //     // This is the core of our thematic search, using plausible tag URNs.
//         //     "tags": [
//         //       "urn:tag:keyword:media:zombie_film",
//         //       "urn:tag:keyword:media:post_apocalyptic"
//         //     ]
//         //   },
//         //   // This tells Qloo to match movies with EITHER tag (OR logic).
//         //   "operator": {
//         //     "filter": { "tags": "union" }
//         //   },
//         //   "take": 25
//         // };

//         // Dynamically add the user's other filters on top of the theme
//         if (locationQuery) {
//           qlooRequestBody.signal = { location: { query: locationQuery } };
//         }
//         if (country) {
//           qlooRequestBody.filter.release_country = country;
//         }
//         if (year) {
//           qlooRequestBody.filter.release_year = { min: parseInt(year), max: parseInt(year) };
//         }

//         apiResponse = await axios.post(
//           `${qlooApiUrl.value()}/v2/insights`,
//           qlooRequestBody,
//           { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } }
//         );
//       }
      
//       const movies = apiResponse.data.results ? apiResponse.data.results.entities : apiResponse.data.data;

//       const cleanedData = movies.map((movie) => ({
//         title: movie.name,
//         filmingLocation: movie.properties.filming_location,
//         releaseYear: movie.properties.release_year,
//         description: movie.properties.description,
//         imageUrl: movie.properties.image?.url,
//       }));

//       response.status(200).send(cleanedData);

//     } catch (error) {
//       console.error("Error in getMovies:", error.response?.data || error.message);
//       response.status(500).send("Something went wrong!");
//     }
//   });
// });

// In functions/index.js
// exports.getMovies = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
//   cors(request, response, async () => {
//     try {
//       const { searchTerm, year, country, genres } = request.body;
//       let apiResponse;

//       // If the user provides a specific movie title, use the /search endpoint.
//       if (searchTerm) {
//         apiResponse = await axios.get(`${qlooApiUrl.value()}/search`, {
//           headers: { "x-api-key": qlooApiKey.value() },
//           params: { q: searchTerm, type: "movie", take: 25 }
//         });
//       } else {
//         // For all other filters, build a request for the /insights endpoint.
//         let qlooRequestBody = {
//           filter: { "type": "urn:entity:movie" },
//           take: 25 // Use the correct parameter 'take'
//         };

//         // Dynamically add filters if they are provided from the frontend
//         if (country) {
//           qlooRequestBody.filter.release_country = country;
//         }
//         if (year) {
//           qlooRequestBody.filter.release_year = { min: parseInt(year), max: parseInt(year) };
//         }
//         if (genres && genres.length > 0) {
//           qlooRequestBody.filter.tags = genres; // Expects an array of tag URNs
//           // If you have multiple genres, you might need an operator
//           if (genres.length > 1) {
//             qlooRequestBody.operator = { "filter": { "tags": "union" } }; // Use 'union' for OR logic
//           }
//         }

//         // If no specific filters are given, default to US-based movies
//         if (!country && !year && (!genres || genres.length === 0)) {
//           qlooRequestBody.filter.release_country = "US";
//         }

//         apiResponse = await axios.post(
//           `${qlooApiUrl.value()}/v2/insights`,
//           qlooRequestBody,
//           { headers: { "Content-Type": "application/json", "x-api-key": qlooApiKey.value() } }
//         );
//       }
      
//       const movies = apiResponse.data.results ? apiResponse.data.results.entities : apiResponse.data.data;

//       const cleanedData = movies.map((movie) => ({
//         title: movie.name,
//         filmingLocation: movie.properties.filming_location,
//         releaseYear: movie.properties.release_year,
//         description: movie.properties.description,
//         imageUrl: movie.properties.image?.url,
//       }));

//       response.status(200).send(cleanedData);

//     } catch (error) {
//       console.error("Error in getMovies:", error.response?.data || error.message);
//       response.status(500).send("Something went wrong!");
//     }
//   });
// });



// ORIGINAL CODE
// exports.getMovies = functions.https.onRequest({ serviceAccount: SERVICE_ACCOUNT_EMAIL }, (request, response) => {
//   cors(request, response, async () => {
//     try {
//       // Reverting to the simple, working query from your original version
//       const qlooRequestBody = {
//         filter: {
//           type: "urn:entity:movie",
//           geocode: { country_code: "US" },
//         },
//         limit: 2, // Setting limit to 2 as requested
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
//       console.error("Error in getMovies:", error.response?.data || error.message);
//       response.status(500).send("Something went wrong!");
//     }
//   });
// });

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