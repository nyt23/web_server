async function getWeatherInformation (){
    const openWeatherAPI = '5873deca76d43e9f25813477324ca93e';
    const input_city = document.getElementById('searchBar').value;
    const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${input_city}&limit=1&appid=${openWeatherAPI}`;
    const location_response = await fetch(locationURL);
    const location = await location_response.json();
    //console.log(locationURL);
    const lat = location[0].lat;
    const lon = location[0].lon;
    //city and country
    const city = location[0].name;
    const country_code = location[0].country;

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherAPI}`;
    try {
        const response = await fetch(weatherURL);
        const weatherData = await response.json();

        //temperature
        const temperature = weatherData.main.temp;

        //display
        const weatherInfo = document.getElementById('result');
        weatherInfo.innerText = `Current temperature in ${city}, ${country_code}: ${temperature}°C.`
    } catch (error) {
        console.error('Error fetching weather information: ', error);
        const errorMessage = document.createElement('div');
        errorMessage.innerText = 'Failed to fetch weather data.';
        const searchWeatherButton = document.getElementById('searchButton')
        searchWeatherButton.replaceWith(errorMessage);
    }
}