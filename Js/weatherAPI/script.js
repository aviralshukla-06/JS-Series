const API_key = `1840f727cbbca30db123df5007967f1b`;


const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');
const error = document.querySelector('#errorMsg');
const mainClass = document.querySelector('#weatherClass');


const weatherUpdate = async function checkWeather(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

    const response = await fetch(URL);


    error.style.display = 'none';
    error.innerText = '';
    mainClass.style.display = 'block';
    if (!response.ok) {
        mainClass.style.display = 'none';
        error.style.display = 'block';
        error.innerText = `Sorry! Unable to fetch details of defined location`;


    } else {

        const data = await response.json();

        return showWeather(data);
    }


}

const showWeather = (data) => {

    temperature.innerText = `Temperature : ${Math.floor(data.main.temp - 273)} °C`;
    description.innerText = data.weather[0].description;
    humidity.innerText = `Humidity : ${data.main.humidity}%`;
    wind_speed.innerText = `Wind-Speed: ${data.wind.speed} m/s`;


}


searchBtn.addEventListener('click', () => {
    weatherUpdate(inputBox.value);
});
