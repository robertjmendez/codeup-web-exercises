(function (){
// Mapbox access token
mapboxgl.accessToken = mapBoxApiKey;

// Creates a new Mapbox map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 11,
    center: [-97.1467, 31.5493]
});

// Array of restaurant information
var restaurantsInfo = [
    {
        address: "Maria Mezcaleria, 724 Austin Ave Ste 102 Waco, TX",
        popupHTML: "<p>Maria Mezcaleria: Best Esquites in Town!</p>"
    },
    {
        address: "Marcos Pizza, 100 B Midway Center Woodway, TX",
        popupHTML: "<p>Marcos Pizza: Best Pizza!</p>"
    },
    {
        address: "Health Camp, 2601 Circle Rd, Waco, TX",
        popupHTML: "<p>Health Camp: Best Burgers!</p>"
    }
];

// Function to add a marker and popup on the map
function placeMarkerAndPopup(info, token, map) {
    // Geocode the restaurant address and add a marker with a popup to the map
    geocode(info.address, token).then(function (coordinates) {
        var popup = new mapboxgl.Popup()
            .setHTML(info.popupHTML);

        var marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map)
            .setPopup(popup);
    });
}

// Adds markers and popups for each restaurant
restaurantsInfo.forEach(function (restaurant) {
    placeMarkerAndPopup(restaurant, mapBoxApiKey, map);
});

// Event listener for the zoom dropdown
document.getElementById('zoom').addEventListener('change', function () {
    // Change the map zoom level based on the selected value
    map.setZoom(parseInt(this.value));
});

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', function () {
    var address = document.getElementById('address').value;
    // Sets the map center to the resulting coordinates
    geocode(address, mapBoxApiKey).then(function (coordinates) {
        map.setCenter(coordinates);
        // Adds a marker at the geocoded coordinates and add it to the map
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    });
});

})();