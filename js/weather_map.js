(function() {
    "use strict";

    // Weather API configuration
    const weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast";
    const weatherApiKey = openWeatherApiKey;
    const weatherUnits = "imperial";

    // Mapbox configuration
    const mapboxAccessToken = mapBoxApiKey;
    const mapboxGeocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

    // DOM elements
    const forecastContainer = $('#forecast-container');
    const locationInput = $('#location-input');
    const topLocation = $('#top-location');
    $('#map-container');
    let modeToggler = $('#mode-toggler');

    // Fetch weather forecast
    function fetchWeatherForecast(lat, lon) {
        return $.get(weatherApiUrl, {
            APPID: weatherApiKey,
            lat: lat,
            lon: lon,
            units: weatherUnits
        });
    }

    function updateForecast(data) {
        let forecastData = data.list;
        let htmlResult = '';
        let previousDate = '';
        let cardCount = 0;
        const currentDate = new Date().toLocaleDateString(undefined, { weekday: 'long' }); // Get current date

        console.log(forecastData)

        for (let i = 0; i < forecastData.length; i++) {
            let date = forecastData[i].dt_txt.split(" ")[0];
            let dayOfWeek = new Date(forecastData[i].dt_txt).toLocaleDateString(undefined, { weekday: 'long' });

            if (date === previousDate) {
                continue;
            }

            previousDate = date;

            let currentTemp = forecastData[i].main.temp.toFixed(0);
            let minTemp = forecastData[i].main.temp_min.toFixed(0);
            let maxTemp = forecastData[i].main.temp_max.toFixed(0);
            let weatherDescription = forecastData[i].weather[0].description;
            let humidity = forecastData[i].main.humidity;
            let pressure = forecastData[i].main.pressure;
            let wind = forecastData[i].wind.speed.toFixed(0);
            let iconCode = forecastData[i].weather[0].icon;
            let iconUrl = iconMap[iconCode] || "img/sun.png";

            if (dayOfWeek === currentDate) {
                dayOfWeek = "Today";
            }

            htmlResult += renderForecastCard(dayOfWeek, iconUrl, currentTemp, maxTemp, minTemp, weatherDescription, humidity, wind, pressure);

            cardCount++;

            if (cardCount >= 5) {
                break;
            }
        }

        forecastContainer.html(htmlResult);
    }

    // Render forecast card
    function renderForecastCard(dayOfWeek, iconUrl, currentTemp, maxTemp, minTemp, weatherDescription, humidity, wind, pressure) {
        return `
    <div class="card mb-2 mx-2 col-xs-12">
        <div class="card-header rounded-top d-flex justify-content-center pt-3">${dayOfWeek}</div>
        <div class="image d-flex justify-content-center">
            <img src="${iconUrl}" alt="Weather Icon" height="110px" width="110px">
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

    // Fetch location details from coordinates
    function reverseGeocode(coordinates) {
        return fetch(`${mapboxGeocodingUrl}${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxAccessToken}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const cityFeature = data.features.find(function(feature) {
                    return feature.place_type.includes('place');
                });

                const city = cityFeature ? cityFeature.text : '';

                const state = data.features[0].context.find(function(context) {
                    return context.id.startsWith('region');
                }).text;

                return {
                    city: city,
                    state: state
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

    // Function to handle marker changes
    function handleMarkerChange(coordinates) {
        if (currentMarker) {
            currentMarker.remove();
        }

        currentMarker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);

        reverseGeocode(coordinates)
            .then(function (locationData) {
                const city = locationData.city;
                const state = locationData.state;
                const locationName = `${city}, ${state}`;
                const iconHTML = '<i class="fas fa-location-dot mr-2"></i>';
                topLocation.html(iconHTML + locationName);

                fetchWeatherForecast(coordinates[1], coordinates[0])
                    .done(function (data) {
                        updateForecast(data);
                    });
            });
    }

    // Add click event listener to the map
    map.on("click", function (event) {
        var coordinates = event.lngLat;
        handleMarkerChange([coordinates.lng, coordinates.lat]);
    });

    // Add keypress event listener to location input
    locationInput.keypress(function (e) {
        if (e.which == 13) {
            let location = $(this).val();

            fetch(`${mapboxGeocodingUrl}${location}.json?access_token=${mapboxAccessToken}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.features.length > 0) {
                        let coordinates = data.features[0].center;

                        map.flyTo({
                            center: coordinates,
                            essential: true,
                            zoom: 10
                        });

                        handleMarkerChange(coordinates);
                    } else {
                        console.error("No results found for the entered location.");
                    }
                });
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
        "10d": "img/rain-drizzle.png",
        "10n": "img/rain-shower.png",
        "11d": "img/storm.png",
        "11n": "img/lightning-bolt.png",
        "13d": "img/snow.png",
        "13n": "img/snow.png",
        "50d": "img/fog.png",
        "50n": "img/fog.png"
    };

    // Event listener for the mode toggler's click event
    modeToggler.on('click', function() {
        let theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    });

    $(window).on('load', function() {
        let theme = 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        modeToggler.prop('checked', theme === 'dark');
    });

    modeToggler.on('change', function() {
        let newTheme = $(this).prop('checked') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    });

    // Initial marker and forecast update
    const initialCoordinates = [-97.2050, 31.5060];
    handleMarkerChange(initialCoordinates);
})();

