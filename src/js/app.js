
let map;

function initMap() {
  // Initialize Google Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
    zoom: 8,
  });

  // Call your KeyClue API here (replace YOUR_API_KEY with your actual key)
  fetch('https://api.keyclue.com/endpoint_for_movies?api_key=YOUR_KEYCLUE_API_KEY')
    .then(response => response.json())
    .then(data => {
      // Assuming the API returns movies with their filming location lat/lng
      data.movies.forEach(movie => {
        if (movie.location) {
          const marker = new google.maps.Marker({
            position: { lat: movie.location.lat, lng: movie.location.lng },
            map: map,
            title: movie.title, // You can change this to whatever info you want
          });
        }
      });
    })
    .catch(error => console.error('Error fetching movie data:', error));
}
