
async function updateForecast() {
    const openWeatherAPI = '5873deca76d43e9f25813477324ca93e';
    const username = sessionStorage.getItem('username');
    const city_response = await fetch(`/api/${username}/city`);
    const city = await city_response.text();

    const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherAPI}`;
        const location_response = await fetch(locationURL);
        const location = await location_response.json();

        const lat = location[0].lat;
        const lon = location[0].lon;

    const weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherAPI}`;
        const response = await fetch(weatherForecastURL);
        const weatherForecastData = await response.json();
        console.log(weatherForecastData);

    document.getElementById('forecast_line').innerText = `Weather Forecast for ${city}:`

    const forecastContainer = document.getElementById('forecast');
    for (let i = 0; i < weatherForecastData.list.length; i++) {
        const dateTimeString = weatherForecastData['list'][i].dt_txt;
        // format the date
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString('en-US', { //options
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
        });
        console.log(dateTimeString);
        const description = weatherForecastData['list'][i].weather[0].description;
        const temperature = Math.round(weatherForecastData['list'][i].main.temp);
        //const weather_icon = weatherForecastData['list'][i].weather[0].icon;
        //console.log(description);
        //console.log(temperature);


        // create card element
        const card = document.createElement('div');
        card.className = 'card';
        // add content
        card.innerHTML = `
        <p>${formattedDate}</p>
        <p>${description}</p>
        <p><strong>${temperature}°C</strong></p>`;

        forecastContainer.appendChild(card);
    }


}

