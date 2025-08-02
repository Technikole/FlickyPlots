// =================================================================================
// Global Variables
// =================================================================================
let map;
let movieMarkers = [];


// =================================================================================
// Initialization
// =================================================================================

/**
 * Entry point called by the Google Maps API script once it has loaded.
 * Initializes the map, fetches initial data, and sets up event listeners.
 */
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 39.8283, lng: -98.5795 },
        mapId: 'YOUR_MAP_ID', // Make sure your real Map ID is here
        tilt: 45,
        heading: 0,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite"],
        },
    });

    // Fetch initial data on page load
    fetchAndProcessMovies();
    // Set up event listeners for the filter bar and UI elements
    setupEventListeners();
}

/**
 * Sets up all the interactive event listeners for the page.
 */
function setupEventListeners() {
    // Filter and Reset buttons
    document.getElementById('filter-button').addEventListener('click', () => fetchAndProcessMovies());
    document.getElementById('reset-button').addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        document.getElementById('location-input').value = '';
        fetchAndProcessMovies();
    });

    // Modal buttons
    const aboutButton = document.getElementById('about-button');
    const closeModalButton = document.getElementById('close-modal-button');
    const modal = document.getElementById('about-modal');

    aboutButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Theme toggle button
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', function() {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('color-theme', newTheme);
        applyTheme(newTheme);
    });
}


// =================================================================================
// Data Fetching & Processing
// =================================================================================

/**
 * Fetches movie data from our backend based on UI filters, then updates the map and table.
 */
async function fetchAndProcessMovies() {
    clearMarkers();
    renderMovieTable([]); // Show a loading/empty state

    const searchTerm = document.getElementById('search-input').value;
    const locationQuery = document.getElementById('location-input').value;

    const filters = { searchTerm, locationQuery };

    try {
        const response = await fetch('/getMovies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters)
        });

        if (!response.ok) throw new Error(`Network response was not ok`);
        const movies = await response.json();

        plotMoviesOnMap(movies);
        renderMovieTable(movies);
    } catch (error) {
        console.error('Failed to fetch movie data:', error);
        document.getElementById('movie-table').innerHTML = `<p class="text-red-500">Could not load movie data.</p>`;
    }
}


// =================================================================================
// UI Rendering and Interaction
// =================================================================================

/**
 * Clears all existing markers from the map and resets the markers array.
 */
function clearMarkers() {
    movieMarkers.forEach(markerData => {
        markerData.marker.setMap(null);
    });
    movieMarkers = [];
}

/**
 * Renders the array of movie data into the table at the bottom of the page.
 * @param {Array<Object>} movies - The array of movie data.
 */
function renderMovieTable(movies) {
    const tableContainer = document.getElementById('movie-table');
    if (!movies || movies.length === 0) {
        tableContainer.innerHTML = '<h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">No movies found. Try a different filter.</h2>';
        return;
    }
    let tableHtml = `
        <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Movie Details -<span class=""> powered by Qloo </span></h2>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <thead class="bg-gray-800 dark:bg-gray-700 text-white">
                    <tr>
                        <th class="py-3 px-4 text-left">Poster</th>
                        <th class="py-3 px-4 text-left">Title</th>
                        <th class="py-3 px-4 text-left">Filming Location</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300">`;
    movies.forEach(movie => {
        if (movie.title) {
            tableHtml += `
                <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onclick="panToMarker('${movie.title.replace(/'/g, "\\'")}')">
                    <td class="py-3 px-4"><img src="${movie.imageUrl || ''}" alt="${movie.title}" class="h-20 w-auto rounded"></td>
                    <td class="py-3 px-4">${movie.title} (${movie.releaseYear || 'N/A'})</td>
                    <td class="py-3 px-4">${movie.filmingLocation || 'N/A'}</td>
                </tr>`;
        }
    });
    tableHtml += `</tbody></table></div>`;
    tableContainer.innerHTML = tableHtml;
}

/**
 * Plots each movie on the map, creating markers and info windows.
 * @param {Array<Object>} movies - The array of movie data.
 */
function plotMoviesOnMap(movies) {
    const geocoder = new google.maps.Geocoder();
    const infoWindow = new google.maps.InfoWindow({ maxWidth: 400 });

    movies.forEach(movie => {
        if (!movie.filmingLocation) return;

        geocoder.geocode({ 'address': movie.filmingLocation }, (results, status) => {
            if (status === 'OK') {
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: movie.title,
                    icon: {
                        url: "https://cdn.technikole.com/images/popcorn.png",
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });

                movieMarkers.push({ title: movie.title, marker: marker });

                marker.addListener('click', () => {
                    const infoWindowContent = `
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="flex-shrink: 0;">
                                <img src="${movie.imageUrl || ''}" style="width: 120px; height: auto; border-radius: 4px;">
                            </div>
                            <div>
                                <h3 class="font-bold text-base" style="margin-bottom: 5px;">${movie.title}</h3>
                                <p style="font-size: 13px; margin-bottom: 8px;"><strong>Location:</strong> ${movie.filmingLocation}</p>
                                <div id="ai-content" style="padding-top: 8px; border-top: 1px solid #e5e7eb;">
                                    <p class="text-sm text-gray-500 italic">Imagine the Scene...</p>
                                </div>
                            </div>
                        </div>`;
                    
                    infoWindow.setContent(infoWindowContent);
                    infoWindow.open(map, marker);
                    fetchAiGuide(movie);
                });
            } else {
                console.error(`Geocode for "${movie.filmingLocation}" failed: ${status}`);
            }
        });
    });
}

/**
 * Pans the map to a specific marker when a table row is clicked.
 * @param {string} title - The title of the movie to find.
 */
function panToMarker(title) {
    const markerData = movieMarkers.find(m => m.title === title);
    if (markerData) {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
        map.panTo(markerData.marker.getPosition());
        map.setZoom(12);
        google.maps.event.trigger(markerData.marker, 'click');
    }
}

/**
 * Fetches the AI-generated content for a specific movie and updates its info window.
 * @param {Object} movie - The movie object.
 */
async function fetchAiGuide(movie) {
    try {
        const response = await fetch('/getAiTourGuide', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: movie.title,
                location: movie.filmingLocation,
                releaseYear: movie.releaseYear
            }),
        });
        if (!response.ok) throw new Error('AI response not ok');
        const data = await response.json();
        
        const aiContentDiv = document.getElementById('ai-content');
        if (aiContentDiv) {
            const newHtml = `
                <h4 class="font-semibold text-sm mt-2 text-gray-800">Cultural Pairings</h4>
                <ul class="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                    <li><strong>Book:</strong> <em>${data.book.title}</em> - ${data.book.reason}</li>
                    <li><strong>Album:</strong> <em>${data.album.title}</em> - ${data.album.reason}</li>
                </ul>
                <h4 class="font-semibold text-sm mt-3 text-gray-800">Travel Pitch</h4>
                <p class="text-sm text-gray-600">${data.pitch}</p>
            `;
            aiContentDiv.innerHTML = newHtml;
        }
    } catch (error) {
        console.error('Failed to fetch AI guide:', error);
        const aiContentDiv = document.getElementById('ai-content');
        if (aiContentDiv) {
            aiContentDiv.innerHTML = `<p class="text-sm text-red-500">Could not generate tour.</p>`;
        }
    }
}


// =================================================================================
// Theme Toggle Logic
// =================================================================================

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleButton = document.getElementById('theme-toggle');

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
};

let savedTheme = localStorage.getItem('color-theme');
if (!savedTheme) {
    savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
applyTheme(savedTheme);