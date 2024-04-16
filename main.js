window.onload = function () {

  async function getData(url = "") {
    const geo = ymaps.geolocation;
    let userLocation = ymaps.geolocation.city;
    const appid = "appid=85d298a42fe8487992bc681eaec51e81";
    const lang = "lang=ru";
    const units = "units=metric";
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    document.cookie="__Host-name=value; Secure; Path=/; SameSite=None; Partitioned;";

    document.getElementById("location-name")
    .textContent = userLocation;

    const response = await fetch(url + "?q=" + userLocation + "&" + appid + "&" + lang + "&" + units, requestOptions);
    return await response.json();
  }

  let date = new Date().toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  getData("https://api.openweathermap.org/data/2.5/weather")
  .then((data) => {

    document.getElementById("root").setAttribute("style", 
    "background: url(./img/backgrounds/" + data.weather[0].icon + ".jpg) fixed; background-size: cover;")

    document.getElementById("weather-description")
    .textContent = data.weather[0].description;

    document.getElementById("weather-icon")
    .setAttribute("src", "./img/icons/" + data.weather[0].icon + ".png");

    document.getElementById("weather-temp")
    .textContent = "" + Math.round(data.main.temp) + "°C";

    document.getElementById("weather-feels")
    .textContent = "Ощущается как  " + Math.round(data.main.feels_like) + "°C";

    document.getElementById("weather-pressure")
    .textContent = "" + Math.round(data.main.pressure / 1.333) + " мм ртутного столба";

    document.getElementById("weather-humidity")
    .textContent = "Влажность " + data.main.humidity + "%";

    document.getElementById("weather-wind-speed")
    .textContent = "Ветер " + data.wind.speed + " м/c";

    document.getElementById("weather-location")
    .textContent = data.name;

    document.getElementById("weather-date")
    .textContent = date;

    if(data.dt < data.sys.sunrise) {
      document.documentElement.style.setProperty('--iconbrightness', 1);
      document.documentElement.style.setProperty('--pagetextcolor', 'white');
      document.documentElement.style.setProperty('--pagebackground', 'rgba(0,0,0,0.5)');
    }
    else {
      document.documentElement.style.setProperty('--iconbrightness', 0);
      document.documentElement.style.setProperty('--pagetextcolor', 'black');
      document.documentElement.style.setProperty('--pagebackground', 'rgba(255,255,255,0.5)');
    }
  })
}