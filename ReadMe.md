# FlickyPlots Zombie Edition

Mapping the intersection of film, culture, and the real world with a touch of AI magic.

## Project Overview [Zombies]

FlickyPlots is a web application that visualizes the filming locations of iconic movies on an interactive map. What started as a tool for movie buffs has evolved to explore cultural trends and thematic narratives, all powered by an AI assistant that brings each location to life.

## Version History

This project is an evolving exploration of what's possible with modern APIs and AI.

* **vGMaps (Version 1):** The original proof-of-concept created for the **Google Maps Platform Awards (2025)**. This version focused on plotting movie locations and providing basic information in a clean, user-friendly interface.

* **vQloo (Version 2):** Enhanced for the **Qloo LLM Hackathon (2025)**, this version introduced a deeper integration with Qloo's cultural data and used the Gemini AI to generate cross-domain recommendations (books, music) and a travel pitch. *(Developer's Note: The InfoWindow card design in this version was found to be too small and will be improved in vZombie).*

* **vZombie (Version 3 - In Progress):** The `zombies` branch. This version refines the user experience and pivots to a thematic focus: mapping the locations of zombie and apocalyptic films to create "Zombie Trails."

## Now in Development: vZombie

This new version will introduce several key enhancements to the look, feel, and functionality of the application.

* **Thematic Data:** The app will exclusively feature zombie and post-apocalyptic films.
* **Dark Mode:** A full dark mode theme for a more cinematic, on-theme experience.
* **Enhanced AI Descriptions:** A new, custom-led approach to generating AI content for each location.
* **Filtering Capabilities:** Users will be able to filter the mapped results.
* **Unified Navigation:** The main navigation will eventually include links to view the vGMaps and vQloo versions.

## Tech Stack

* **Backend:** Firebase Functions (Node.js)
* **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
* **Hosting:** Firebase Hosting
* **APIs:**
    * Google Maps Platform (Maps JavaScript API, Geocoding API)
    * Qloo API for cultural data
    * Google Gemini API for generative AI content

## Local Development

1.  Clone the repository.
2.  Install dependencies: `npm install` in the root and `functions` directories.
3.  Configure your environment variables in `functions/.env.<your-project-id>`.
4.  Run the Firebase Emulator from the root directory: `npm run dev`.

---# FlickyPlots

Mapping the intersection of film, culture, and the real world with a touch of AI magic.

## Project Overview

FlickyPlots is a web application that visualizes the filming locations of iconic movies on an interactive map. What started as a tool for movie buffs has evolved to explore cultural trends and thematic narratives, all powered by an AI assistant that brings each location to life.

## Version History

This project is an evolving exploration of what's possible with modern APIs and AI.

* **vGMaps (Version 1):** The original proof-of-concept created for the **Google Maps Platform Awards (2025)**. This version focused on plotting movie locations and providing basic information in a clean, user-friendly interface.

* **vQloo (Version 2):** Enhanced for the **Qloo LLM Hackathon (2025)**, this version introduced a deeper integration with Qloo's cultural data and used the Gemini AI to generate cross-domain recommendations (books, music) and a travel pitch. *(Developer's Note: The InfoWindow card design in this version was found to be too small and will be improved in vZombie).*

* **vZombie (Version 3 - In Progress):** The current version, now on the `zombies` branch. This version refines the user experience and pivots to a thematic focus: mapping the locations of zombie and apocalyptic films to create "Zombie Trails."

## Now in Development: vZombie

This new version will introduce several key enhancements to the look, feel, and functionality of the application.

* **Thematic Data:** The app will exclusively feature zombie and post-apocalyptic films.
* **Dark Mode:** A full dark mode theme for a more cinematic, on-theme experience.
* **Enhanced AI Descriptions:** A new, custom-led approach to generating AI content for each location.
* **Filtering Capabilities:** Users will be able to filter the mapped results.
* **Unified Navigation:** The main navigation will eventually include links to view the vGMaps and vQloo versions.

## Tech Stack

* **Backend:** Firebase Functions (Node.js)
* **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
* **Hosting:** Firebase Hosting
* **APIs:**
    * Google Maps Platform (Maps JavaScript API, Geocoding API)
    * Qloo API for cultural data
    * Google Gemini API for generative AI content

## Local Development

1.  Clone the repository.
2.  Install dependencies: `npm install` in the root and `functions` directories.
3.  Configure your environment variables in `functions/.env.<your-project-id>`.
4.  Run the Firebase Emulator from the root directory: `npm run dev`.

---