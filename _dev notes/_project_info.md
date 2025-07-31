# To run locally

cd functions
npm run dev
 - html (5000)
 - /letsGo
 - /qlooProxy (QLOO API)


<!--  
 - npm run dev / starts Tailwind
 - cd functions / npm run serve (started api and emulators)
 -   functions: Loaded functions definitions from source: letsGo, qlooProxy.
       - +  functions[us-central1-letsGo]: http function initialized (http://127.0.0.1:5001/flickyplots/us-central1/letsGo).
      -  +  functions[us-central1-qlooProxy]: http function initialized (http://127.0.0.1:5001/flickyplots/us-central1/qlooProxy). -->

      <!-- - │ i  View Emulator UI at http://127.0.0.1:4000/  -->


# Movie Location Trends with FlickyPlots
Using Qloo’s API pull cultural trend data to define movies and their locations. Plot that information to a Google Map via API call allowing curious movie goers to view movie location trends around the world. Then integrate with AI.

<!-- Train AI on MovieData? -->

Tools:
Qloo - Trend data API
Google Maps: API
Open Movie Data 
Ollama + Gemma3n or other AI
alternative: Gemini

## MVP

1. Use Qloo Trends API to Grab Movies and Locations [ authenticate QLOO, make the API call, get back movie data. ]
2. Extract Movie, Location Data from API Response (perhaps other info)
3. Plot movie location data to Google Map Points [ does this count for the hackathon? ]
4. Begin modification of idea to incorporate an AI solution


## Extended MVP [ TBD ]

3. Think genres, actors, annual trends etc


/FlickyPlots/
├── /functions           # Backend functions (API proxies)
│   ├── index.js         # Firebase Cloud Functions entry point
│   ├── package.json     # Node dependencies for functions
│   └── .env             # Optional, not used here, but can be
├── /public              # Static frontend
│   ├── index.html       # HTML entry point
│   ├── app.js           # Frontend logic
├── .firebaserc          # Firebase project configuration
├── firebase.json        # Firebase hosting & functions configuration
├── package.json         # (root) general project dependencies


Implementation Steps
Firebase CI server as needed 1//05XJbbQONndH4CgYIARAAGAUSNwF-L9IrbRVKPc7QGED74jlvfroRVrgqw6pb1rcdBDiBIyoAlfM5eLQwKA-Ne3aM0Go2TzuC-XQ
 firebase deploy --token "$FIREBASE_TOKEN"

firebase functions:config:set qloo.key="UebaZHRH0Xjc5jFchVGldyuE2P2uYkN3W_S1Y-e5OTs"
switch to dotenv due to deprecation

npm install dotenv

Expanded a lot into : 
A Firebase-hosted web app with minimal backend logic (via Cloud Functions), powered by a modern frontend (likely Vite or vanilla HTML/CSS/JS), using .env values for config like API keys or endpoints.


Additional Required Steps
 tighten up rules for auth users, specific paths, or file types. (storage.rules -> firebase)


