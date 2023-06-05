$(document).ready(function() {
    "use strict";

    // Weather API configuration
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const weatherApiKey = OPEN_WEATHER_API_KEY;
    const weatherUnits = "imperial";

    // Mapbox configuration
    const mapboxGeocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const mapboxAccessToken = MAPBOX_API_KEY;

    // DOM elements
    const forecastContainer = $('#forecast-container');
    const locationInput = $('#location-input');
    const topLocation = $('#top-location');
    let modeToggler = $('#mode-toggler');

    // Fetch weather forecast
    function fetchWeatherForecast(lat, lon) {
        return $.get(weatherApiUrl, {
            appid: weatherApiKey,
            lat: lat,
            lon: lon,
            units: weatherUnits
        });
    }

    // This function updates the weather forecast on the page.
    function updateForecast(data) {
        // Extract the daily forecast data from the input data.
        let forecastData = data.daily;

        // Initialize an empty string to build the HTML for the forecast cards.
        let htmlResult = '';

        // Get the current date, formatted to show the weekday name.
        const currentDate = new Date().toLocaleDateString(undefined, { weekday: 'long' });

        // Initialize a counter for the number of forecast cards rendered.
        let cardCount = 0;

        // Loop over the daily forecast data.
        for (let i = 0; i < forecastData.length; i++) {
            // For each day, get the date, formatted to show the weekday name.
            let date = new Date(forecastData[i].dt * 1000).toLocaleDateString(undefined, { weekday: 'long' });

            // If the date is the current date, use "Today" for the day of the week.
            // Otherwise, use the weekday name.
            let dayOfWeek = date === currentDate ? "Today" : date;

            // Extract various pieces of weather data for the day.
            let currentTemp = forecastData[i].temp.day.toFixed(0);
            let minTemp = forecastData[i].temp.min.toFixed(0);
            let maxTemp = forecastData[i].temp.max.toFixed(0);
            let weatherDescription = forecastData[i].weather[0].description;
            let humidity = forecastData[i].humidity;
            let pressure = forecastData[i].pressure;
            let wind = forecastData[i].wind_speed.toFixed(0);

            // Get the weather icon code and use it to build the URL of the icon image.
            let iconCode = forecastData[i].weather[0].icon;
            let iconUrl = iconMap[iconCode] || "img/sun.png";

            // Generate the HTML for the forecast card and add it to the htmlResult string.
            htmlResult += renderForecastCard(dayOfWeek, iconUrl, currentTemp, maxTemp, minTemp, weatherDescription, humidity, wind, pressure);

            // Increment the card count.
            cardCount++;

            // If we have rendered 5 cards, break out of the loop.
            if (cardCount >= 5) {
                break;
            }
        }

        // Set the HTML of the forecast container to the htmlResult string.
        forecastContainer.html(htmlResult);
    }

    // This function generates the HTML for a weather forecast card.
    function renderForecastCard(dayOfWeek, iconUrl, currentTemp, maxTemp, minTemp, weatherDescription, humidity, wind, pressure) {
        return `
    <div class="card mb-2 mx-2 col-xs-12">
        <div class="card-header rounded-top d-flex justify-content-center pt-3">${dayOfWeek}</div>
        <div class="image d-flex justify-content-center">
            <img src="${iconUrl}" alt="Weather Icon" height="100px" width="100px">
        </div>
        <div class="card-body text-primary pt-0">
            <h4 class="card-text m-0 text-center mb-2">${currentTemp} °F</h4>
            <p class="card-text m-0 text-center">${weatherDescription}</p>
            <p class="card-title m-0 text-center">H:${maxTemp} L:${minTemp} °F</p>
            <p class="card-text m-0 text-center">Humidity: ${humidity}%</p>
            <p class="card-text m-0 text-center">Wind: ${wind} mph</p>
            <p class="card-text m-0 text-center">Pressure: ${pressure} hPa</p>
        </div>
    </div>
  `;
    }

    // Function to perform reverse geocoding
    function reverseGeocode(coordinates) {
        return fetch(`${mapboxGeocodingUrl}${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxAccessToken}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Find the feature in the response data where the place_type includes 'place'
                let placeFeature = data.features.find(function(feature) {
                    return feature.place_type.includes('place');
                });

                // Find the feature in the response data where the place_type includes 'region'
                let regionFeature = data.features.find(function(feature) {
                    return feature.place_type.includes('region');
                });

                // Find the feature in the response data where the place_type includes 'country'
                let countryFeature = data.features.find(function(feature) {
                    return feature.place_type.includes('country');
                });

                // Initialize a location string
                let location = '';

                // If there's a 'place' feature, add its text to the location string
                if (placeFeature) {
                    location += placeFeature.text;
                }

                // If there's a 'region' feature, add its text to the location string,
                // prefixing it with a comma if the location string isn't empty
                if (regionFeature) {
                    location += (location ? ', ' : '') + regionFeature.text;
                }

                // If there isn't a 'place' or 'region' feature but there is a 'country' feature,
                // add its text to the location string
                if (!placeFeature && !regionFeature && countryFeature) {
                    location += countryFeature.text;
                }

                // Return an object containing the location string
                return {
                    location: location
                };
            });
    }

    // Initialize Mapbox map
    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 1,
        center: [-97.1467, 31.5493]
    });

    let currentMarker = null;

    // This function is used to handle changes to the map marker position.
    function handleMarkerChange(coordinates) {

        // Check if there is a marker currently on the map.
        // If there is, it will be removed to place the new one.
        if (currentMarker) {
            currentMarker.remove();
        }

        // Create a new marker at the given coordinates and add it to the map.
        currentMarker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);

        // Call the reverseGeocode function to get location data for the coordinates.
        reverseGeocode(coordinates)
            .then(function (locationData) {
                // Extract the location name from the location data.
                const locationName = locationData.location;

                const iconHTML = '<i class="fas fa-location-dot mr-2"></i>';

                // Update the top location display with the location icon and name.
                topLocation.html(iconHTML + locationName);

                // Fetch weather forecast for the coordinates.
                fetchWeatherForecast(coordinates[1], coordinates[0])
                    .done(function (data) {
                        // Update the weather forecast display with the forecast data.
                        updateForecast(data);
                    });
            });
    }

    // When the map is clicked, this function will be called with the click event as an argument.
    map.on("click", function (event) {
        // Extract the click coordinates from the event object.
        let coordinates = event.lngLat;

        // Pass the coordinates to the handleMarkerChange function.
        handleMarkerChange([coordinates.lng, coordinates.lat]);
    });

    // When the enter key is pressed in the input field, this function will be called with the keypress event as an argument.
    locationInput.keypress(function (e) {
        if (e.which == 13) {
            // Get the location inputted by the user.
            let location = $(this).val();

            // Fetch geocoding data for the inputted location from the Mapbox Geocoding API.
            fetch(`${mapboxGeocodingUrl}${location}.json?access_token=${mapboxAccessToken}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    // If the geocoding data includes at least one location feature...
                    if (data.features.length > 0) {
                        // Get the coordinates of the first feature.
                        let coordinates = data.features[0].center;

                        // Animate the map to fly to the inputted location.
                        map.flyTo({
                            center: coordinates,
                            essential: true,
                            zoom: 10
                        });

                        // Pass the coordinates to the handleMarkerChange function.
                        handleMarkerChange(coordinates);
                    } else {
                        // If no location features were found, log an error message to the console.
                        console.error("No results found for the entered location.");
                    }
                });

            // Prevent the 'Enter' keypress event from doing its default action
            e.preventDefault();
        }
    });

    // Icon map
    let iconMap = {
        "01d": "img/sun.png",
        "01n": "img/moon.png",
        "02d": "img/partly-cloudy-day.png",
        "02n": "img/partly-cloudy-night.png",
        "03d": "img/cloud.png",
        "03n": "img/cloud.png",
        "04d": "img/cloud.png",
        "04n": "img/cloud.png",
        "09d": "img/rain-shower.png",
        "09n": "img/rain-shower.png",
        "10d": "img/rain-shower.png",
        "10n": "img/rain-shower.png",
        "11d": "img/storm.png",
        "11n": "img/lightning-bolt.png",
        "13d": "img/snow.png",
        "13n": "img/snow.png",
        "50d": "img/fog.png",
        "50n": "img/fog.png"
    };
        // Event listeners for the toggle

        // Set the default theme to 'dark' on page load
        $('html').attr('data-theme', 'dark');

        // Event listener for the mode toggler's click event
        $('#mode-toggler').on('click', function() {
            let theme = $('html').attr('data-theme') === 'light' ? 'dark' : 'light';
            $('html').attr('data-theme', theme);
        });

        // Set the initial state of the mode toggler based on the default theme
        let initialTheme = $('html').attr('data-theme');
        $('#mode-toggler').prop('checked', initialTheme === 'dark');

    // Initial marker and forecast update
    const initialCoordinates = [-97.2050, 31.5060];
    handleMarkerChange(initialCoordinates);
});


