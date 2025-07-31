// Global variables to hold the map instance and our markers
let map;
let movieMarkers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 39.8283, lng: -98.5795 },
        mapId: '93c2d724f0e150fab9fcbd41', // Make sure your Map ID is here
        tilt: 45,
        heading: 0,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite"],
        },
    });
    fetchAndProcessMovies(map);
}

// Pan the map to a marker and open its info window when a table row is clicked
function panToMarker(title) {
    const markerData = movieMarkers.find(m => m.title === title);
    if (markerData) {
        map.panTo(markerData.marker.getPosition());
        map.setZoom(12); // Zoom in on the location
        google.maps.event.trigger(markerData.marker, 'click');
    }
}

async function fetchAndProcessMovies(map) {
    try {
        const response = await fetch('/getQloo');
        if (!response.ok) throw new Error(`Network response was not ok`);
        const movies = await response.json();
        plotMoviesOnMap(movies, map);
        renderMovieTable(movies);
    } catch (error) {
        console.error('Failed to fetch movie data:', error);
        document.getElementById('movie-table').innerHTML = `<p class="text-red-500">Could not load movie data.</p>`;
    }
}

function renderMovieTable(movies) {
    const tableContainer = document.getElementById('movie-table');
    if (!movies || movies.length === 0) {
        tableContainer.innerHTML = '<h2>No movie details to display.</h2>';
        return;
    }
    let tableHtml = `
        <h2 class="text-2xl font-semibold mb-4 text-green-500">Movie Details -<span class=""> powered by Qloo </span></h2>
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
        if (movie.title) {
            // Clickable Rows
            tableHtml += `
                <tr class="border-b hover:bg-gray-100 cursor-pointer" onclick="panToMarker('${movie.title.replace(/'/g, "\\'")}')">
                    <td class="py-3 px-4"><img src="${movie.imageUrl || ''}" alt="${movie.title}" class="h-20 w-auto rounded"></td>
                    <td class="py-3 px-4">${movie.title} (${movie.releaseYear || 'N/A'})</td>
                    <td class="py-3 px-4">${movie.filmingLocation || 'N/A'}</td>
                </tr>`;
        }
    });
    tableHtml += `</tbody></table></div>`;
    tableContainer.innerHTML = tableHtml;
}


function plotMoviesOnMap(movies, map) {
    const geocoder = new google.maps.Geocoder();
    const infoWindow = new google.maps.InfoWindow({ maxWidth: 550, maxHeight: 400 });

    movies.forEach(movie => {
        if (!movie.filmingLocation) return;

        geocoder.geocode({ 'address': movie.filmingLocation }, (results, status) => {
            if (status === 'OK') {
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: movie.title,
                   // custom popcorn icon
                    icon: {
                        url: "https://cdn.technikole.com/images/popcorn.png", // Popcorn icon URL
                        scaledSize: new google.maps.Size(40, 40)
                    }
                });

                // Store the marker so we can reference it later
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
                console.error(`Geocode failed: ${status}`);
            }
        });
    });
}

async function fetchAiGuide(movie) {
    try {
        const response = await fetch('/getAiTourGuide', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: movie.title, location: movie.filmingLocation }),
        });
        if (!response.ok) throw new Error('AI response not ok');
        const data = await response.json();
        const aiContentDiv = document.getElementById('ai-content');
        if (aiContentDiv) {
            aiContentDiv.innerHTML = `<p class="text-sm text-gray-800">${data.tourGuideText}</p>`;
        }
    } catch (error) {
        console.error('Failed to fetch AI guide:', error);
        const aiContentDiv = document.getElementById('ai-content');
        if (aiContentDiv) {
            aiContentDiv.innerHTML = `<p class="text-sm text-red-500">Could not generate tour.</p>`;
        }
    }
}


// --- Modal Logic ---
const aboutButton = document.getElementById('about-button');
const closeModalButton = document.getElementById('close-modal-button');
const modal = document.getElementById('about-modal');

aboutButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Use flex to center the content
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});