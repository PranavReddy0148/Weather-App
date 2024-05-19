import apiKey from './config.js'; // remove or comment this line out in your code
// const apiKey = <add_your_api_key_here>; // uncomment this line
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const temp = document.querySelector(".temp");
const tempString = temp.innerText;
let unit = tempString[tempString.length - 1];
let number0;
let number1;

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        let data = await response.json();
        console.log(data);
        number0 = data.main.temp;
        if(unit === `C`){number1 = number0;} 
        else if(unit === `F`){
            number1 = (9/5) * number0 + 32;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(number1) + `°${unit}`;
        document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
        document.querySelector(".wind").innerHTML = data.wind.speed + `km/h`;

        if(data.weather[0].main===`Clouds`){
            document.querySelector(".weather-icon").src = "./images/clouds.png";
        }
        else if(data.weather[0].main===`Clear`){
            document.querySelector(".weather-icon").src = "./images/clear.png";
        }
        else if(data.weather[0].main===`Rain`){
            document.querySelector(".weather-icon").src = "./images/rain.png";
        }
        else if(data.weather[0].main===`Drizzle`){
            document.querySelector(".weather-icon").src = "./images/drizzle.png";
        }
        else if(data.weather[0].main===`Mist`){
            document.querySelector(".weather-icon").src = "./images/mist.png";
        }
        else if(data.weather[0].main===`Snow`){
            document.querySelector(".weather-icon").src = "./images/snow.png";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector('.weather').style.display = "block";

        // const sunrise = data.sys.sunrise + data.timezone;
        // const sunset = data.sys.sunset + data.timezone;
        // const currentTime = Math.floor((Date.now() / 1000) + data.timezone - (new Date().getTimezoneOffset() * 60));

        // if (currentTime > sunrise && currentTime < sunset) {
        //     document.querySelector(".card").classList.remove("outside-hours");
        // } else {
        //     document.querySelector(".card").classList.add("outside-hours");
        // }

        // const timezoneOffset = data.timezone;
        // // const utcTime = new Date();
        // // console.log(utcTime);
        // // const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
        // const localTime = new Date();
        // const hours = localTime.getHours();
        // console.log(localTime);
        // console.log(hours);
        // if(hours < 6 || hours > 18){
        //     document.querySelector(".card").classList.add("outside-hours");
        // }
    }
}

searchBox.addEventListener("keypress", (event) => {
    if(event.key === `Enter`){
        checkWeather(searchBox.value);
    }
})

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

temp.addEventListener("click", () => {
    let number = number0;
    if(unit === `C`){
        unit = `F`;
        number = (9/5) * number + 32;
        document.querySelector(".temp").innerHTML = Math.round(number) + `°${unit}`;
    }
    else if(unit === `F`){
        unit = `C`;
        // number = (number - 32) * (5/9);
        number = number0;
        document.querySelector(".temp").innerHTML = Math.round(number) + `°${unit}`;
    }
})