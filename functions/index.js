const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const { defineString } = require("firebase-functions/params");

const qlooApiKey = defineString("QLOO_API_KEY");
const qlooApiUrl = defineString("QLOO_API_URL");

exports.getQloo = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const qlooRequestBody = {
        filter: {
          type: "urn:entity:movie",
          geocode: {
            country_code: "US",
          },
        },
        limit: 1, // Keeping the limit at 1
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

      // THE FINAL FIX: Using the correct path to the movie array
      const cleanedData = apiResponse.data.results.entities.map((movie) => {
        return {
          title: movie.name,
          filmingLocation: movie.properties.filming_location,
          productionCompanies: movie.properties.production_companies,
          releaseCountry: movie.properties.release_country,
          releaseYear: movie.properties.release_year,
          description: movie.properties.description,
          imageUrl: movie.properties.image?.url,
        };
      });

      // Send the nice, clean data back to the frontend
      response.status(200).send(cleanedData);

    } catch (error) {
      console.error("Error during Qloo processing:", error.response?.data || error.message);
      response.status(500).send("Something went wrong!");
    }
  });
});