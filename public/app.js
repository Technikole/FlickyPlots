/**
 * This is the main function called by the Google Maps script once it's loaded.
 */
function initMap() {
    // Create a new map instance, centered on the USA.
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 39.8283, lng: -98.5795 }, // Center of the USA
    });

    // Fetch our movie data and then plot it on the map and render the table.
    fetchAndProcessMovies(map);
}

/**
 * Fetches movie data from our Firebase Function, then plots it on the
 * map and renders the data into a table.
 * @param {google.maps.Map} map The map instance to plot markers on.
 */
async function fetchAndProcessMovies(map) {
    try {
        // The URL to your DEPLOYED function. Or, use the local emulator URL for testing.
        const functionUrl = '/getQloo'; // Firebase Hosting will proxy this to our function.

        const response = await fetch(functionUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const movies = await response.json();

        // Now that we have the data, plot it and render the table.
        plotMoviesOnMap(movies, map);
        renderMovieTable(movies);

    } catch (error) {
        console.error('Failed to fetch movie data:', error);
        document.getElementById('movie-table').innerHTML = `<p class="text-red-500">Could not load movie data.</p>`;
    }
}

/**
 * Renders the movie data into a table below the map.
 * @param {Array<Object>} movies The array of movie data.
 */
function renderMovieTable(movies) {
    const tableContainer = document.getElementById('movie-table');
    if (!movies || movies.length === 0) {
        tableContainer.innerHTML = '<p>No movies to display.</p>';
        return;
    }

    // Using TailwindCSS classes for styling
    let tableHtml = `
        <h2 class="text-2xl font-bold mb-2">Movie Details</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="py-3 px-4 text-left">Poster</th>
                        <th class="py-3 px-4 text-left">Title</th>
                        <th class="py-3 px-4 text-left">Filming Location</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">`;

    movies.forEach(movie => {
        // Only add a row if there's a title
        if (movie.title) {
            tableHtml += `
                <tr class="border-b">
                    <td class="py-3 px-4"><img src="${movie.imageUrl || ''}" alt="${movie.title}" class="h-16 w-auto rounded"></td>
                    <td class="py-3 px-4">${movie.title} (${movie.releaseYear || 'N/A'})</td>
                    <td class="py-3 px-4">${movie.filmingLocation || 'N/A'}</td>
                </tr>`;
        }
    });

    tableHtml += `</tbody></table></div>`;
    tableContainer.innerHTML = tableHtml;
}


/**
 * Plots each movie on the map using its filming location.
 * @param {Array<Object>} movies The array of movie data.
 * @param {google.maps.Map} map The map instance to plot markers on.
 */
function plotMoviesOnMap(movies, map) {
    const geocoder = new google.maps.Geocoder();
    const infoWindow = new google.maps.InfoWindow();

    movies.forEach(movie => {
        // Skip movies without a location
        if (!movie.filmingLocation) {
            return;
        }

        // Use the Geocoding API to find the coordinates for the location string
        geocoder.geocode({ 'address': movie.filmingLocation }, (results, status) => {
            if (status === 'OK') {
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: movie.title,
                });

                // Create the content for the popup InfoWindow
                const infoWindowContent = `
                    <div class="w-64">
                        <h3 class="font-bold text-lg">${movie.title}</h3>
                        <img src="${movie.imageUrl || ''}" class="w-full h-auto my-2 rounded">
                        <p><strong>Released:</strong> ${movie.releaseYear || 'N/A'}</p>
                        <p><strong>Location:</strong> ${movie.filmingLocation}</p>
                    </div>`;

                // Add a click listener to each marker to show the InfoWindow
                marker.addListener('click', () => {
                    infoWindow.setContent(infoWindowContent);
                    infoWindow.open(map, marker);
                });

            } else {
                console.error(`Geocode was not successful for the following reason: ${status}`);
            }
        });
    });
}