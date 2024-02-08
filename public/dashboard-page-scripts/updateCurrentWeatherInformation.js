
async function updateCurrentWeatherInformation() {
    const openWeatherAPI = '5873deca76d43e9f25813477324ca93e';
    const username = sessionStorage.getItem('username');
    const city_response = await fetch(`/api/${username}/city`);
    const city = await city_response.text();

    const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherAPI}`;
    const location_response = await fetch(locationURL);
    const location = await location_response.json();
    //console.log(location);
    const lat = location[0].lat;
    const lon = location[0].lon;
    // for berlin
    //const lat = '52.5170365';
    //const lon = '13.3888599';

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherAPI}`;

    try {
        const response = await fetch(weatherURL);
        const weatherData = await response.json();

        //temperature
        const temperature = weatherData.main.temp;

        //weather condition
        const weatherCondition = weatherData.weather[0].main;


        // update the dashboard
        // create a new element for weather condition
        const weatherInfo = document.createElement('div');
        weatherInfo.innerText = `Currently, temperature in ${city} is ${temperature}°C and the weather condition is ${weatherCondition}.`;
        // replace the button with new element
        const weatherButton = document.getElementById('weatherButton')
        weatherButton.replaceWith(weatherInfo);

        //select picture div
        const weatherPicture = document.querySelector('#weatherPicture')
        // const imageElement = document.createElement('img')

        console.log(weatherCondition)
        switch (weatherCondition) {
            case 'Clouds':
                weatherPicture.innerHTML = "<img src='/weather-pictures/clouds.jpg'>";
                break;
        }

    } catch (error) {
        console.error('Error fetching weather information: ', error);
        const errorMessage = document.createElement('div');
        errorMessage.innerText = 'Failed to fetch weather data.';
        const weatherButton = document.getElementById('weatherButton')
        weatherButton.replaceWith(errorMessage);
    }
}



/*
// task2 for lecture 6
const weatherInfo = document.createElement('div');
weatherInfo.innerText = `Currently, the temperature in Berlin is ${temperature} °C`;
// replace the button with new element
const weatherButton = document.getElementById('weatherButton')
weatherButton.replaceWith(weatherInfo);

} catch(error) {
console.error('Error fetching weather information: ', error);
const errorMessage = document.createElement('div');
errorMessage.innerText = 'Failed to fetch weather data.';
const weatherButton = document.getElementById('weatherButton')
weatherButton.replaceWith(errorMessage);
}

}


*/