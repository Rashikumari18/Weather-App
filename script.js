const inputBox = document.querySelector('.input-box');

const searchBtn = document.getElementById('searchbtn');

const temperature = document.getElementById('temperature');

const description = document.getElementById('description');

const humidity = document.getElementById('humidity');

const windSpeed = document.getElementById('wind-speed');

const weatherIcon = document.getElementById('weatherIcon');

const errorBox = document.getElementById('error');


function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    else if (code <= 3) {
        return "☁️";
    }

    else if (code <= 48) {
        return "🌫️";
    }

    else if (code <= 67) {
        return "🌧️";
    }

    else if (code <= 77) {
        return "❄️";
    }

    else if (code <= 82) {
        return "🌦️";
    }

    else {
        return "⛈️";
    }

}


async function checkWeather(city) {

    errorBox.textContent = "";

    if (city.trim() === "") {

        errorBox.textContent = "Please enter a city name";

        return;

    }


    try {

        const geoUrl =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;


        const geoResponse = await fetch(geoUrl);

        const geoData = await geoResponse.json();


        if (!geoData.results) {

            errorBox.textContent = "City not found!";

            return;

        }


        const place = geoData.results[0];


        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;


        const weatherResponse = await fetch(weatherUrl);

        const weatherData = await weatherResponse.json();


        const current = weatherData.current;


        temperature.innerHTML =
            `${Math.round(current.temperature_2m)}<sup>°C</sup>`;


        description.textContent =
            `${place.name}, ${place.country}`;


        humidity.textContent =
            `${current.relative_humidity_2m}%`;


        windSpeed.textContent =
            `${current.wind_speed_10m} km/h`;


        weatherIcon.textContent =
            getWeatherIcon(current.weather_code);


    }

    catch (error) {

        console.log(error);

        errorBox.textContent =
            "Something went wrong!";

    }

}


searchBtn.addEventListener('click', () => {

    checkWeather(inputBox.value);

});


inputBox.addEventListener('keydown', (event) => {

    if (event.key === "Enter") {

        checkWeather(inputBox.value);

    }

});