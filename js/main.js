const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let data = new Date();
let cureentMonth = months[data.getMonth()];
let cureentDay = days[data.getDay()];
let tomorrowDay;
let afterTomorrowDay;

let todayBox = document.querySelector("#today-box");
let tomorrowBox = document.querySelector("#tomorrow-box");
let afterTomorrowBox = document.querySelector("#after-tomorrow-box");

let findInput = document.getElementById("find-input");
let findButton = document.getElementById("find-button");

let mobileNavIcon = document.querySelector(".bars");
let mobileNav = document.querySelector(".mobile-nav");

mobileNavIcon.addEventListener("click", () => {
  mobileNav.classList.toggle("active-block");
});

findInput.addEventListener("keyup", e => {
  if(findInput.value != "") {
    let city = findInput.value;
    getTodayWeather(city);
    getTomorrowWeather(city);
    getAfterTomorrowWeather(city);
  }
});
findButton.addEventListener("click", e => {
  if(findInput.value != "") {
    let city = findInput.value;
    getTodayWeather(city);
    getTomorrowWeather(city);
    getAfterTomorrowWeather(city);
  }
});


function getDate() {
  if(data.getDay() >= 6) {
    let tomorrow = days[0];
    let afterTomorrow = days[1];
    tomorrowDay = tomorrow;
    afterTomorrowDay = afterTomorrow;
  } else {
    let tomorrow = days[data.getDay() + 1];
    let afterTomorrow = days[data.getDay() + 2];
    tomorrowDay = tomorrow;
    afterTomorrowDay = afterTomorrow;
  }
}
getDate();

async function getTodayWeather(city) {
  let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=0354d859e80946d495c221630220306&q=${city}&aqi=yes`);
  let resault = await response.json();

  city = resault.location.name;
  mainDegree = resault.current.feelslike_c;
  weatherLogo = resault.current.condition.icon;
  weatherCondition = resault.current.condition.text;
  windDirection = resault.current.wind_dir;
  windSpeed = resault.current.wind_kph;

  todayBox.innerHTML = `
    <div class="header-box">
      <div class="day">${cureentDay}</div>
      <div class="data">${data.getDate()} ${cureentMonth}</div>
    </div>
    <div class="content-box">
      <div class="location-weather">${city}</div>
      <div class="degree-weather">
        <div class="number">
          ${mainDegree}<sup>o</sup>C
        </div>
        <div class="icon-weather">
          <img src="${weatherLogo}" alt="icon-weather">
        </div>
      </div>
      <div class="custom">${weatherCondition}</div>
      <span>
        <img src="weather-icons/icon-umberella.png" alt="Umbrella">10%
      </span>
      <span>
        <img src="weather-icons/icon-wind.png" alt="Wind">${windSpeed}Km/h
      </span>
      <span>
        <img src="weather-icons/icon-compass.png" alt="Compass">${windDirection}
      </span>
    </div>
  `
}

async function getTomorrowWeather(city) {
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0354d859e80946d495c221630220306&q=${city}&days=3&aqi=no&alerts=no`);
  let resault = await response.json();

  weatherLogo = resault.forecast.forecastday[1].day.condition.icon;
  mainDegree = resault.forecast.forecastday[1].day.avgtemp_c;
  minDegree = resault.forecast.forecastday[1].day.mintemp_c;
  weatherCondition = resault.forecast.forecastday[1].day.condition.text;

  tomorrowBox.innerHTML = `
    <div class="header-box">
      <div class="day">${tomorrowDay}</div>
    </div>
    <div class="content-box">
      <div class="icon-weather">
        <img src="${weatherLogo}" alt="icon-weather">
      </div>
      <div class="number">${mainDegree}<sup>o</sup>c</div>
      <small>${minDegree}<sup>o</sup></small>
      <div class="custom">${weatherCondition}</div>
    </div>
  `
}

async function getAfterTomorrowWeather(city) {
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0354d859e80946d495c221630220306&q=${city}&days=3&aqi=no&alerts=no`);
  let resault = await response.json();

  weatherLogo = resault.forecast.forecastday[2].day.condition.icon;
  mainDegree = resault.forecast.forecastday[2].day.avgtemp_c;
  minDegree = resault.forecast.forecastday[2].day.mintemp_c;
  weatherCondition = resault.forecast.forecastday[2].day.condition.text;

  afterTomorrowBox.innerHTML = `
    <div class="header-box">
      <div class="day">${afterTomorrowDay}</div>
    </div>
    <div class="content-box">
      <div class="icon-weather">
        <img src="${weatherLogo}" alt="icon-weather">
      </div>
      <div class="number">${mainDegree}<sup>o</sup>c</div>
      <small>${minDegree}<sup>o</sup></small>
      <div class="custom">${weatherCondition}</div>
    </div>
  `
}