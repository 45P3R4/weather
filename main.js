async function getData(url = "") {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  const response = await fetch(url, requestOptions);
  return await response.json();
}

getData("https://api.openweathermap.org/data/2.5/weather?q=Voronezh&appid=85d298a42fe8487992bc681eaec51e81&lang=ru&units=metric")
.then((data) => {

  document.getElementById("root").setAttribute("style", 
  "background: url(./img/backgrounds/" + data.weather[0].icon + ".jpg) fixed; background-size: cover;")

  document.getElementById("weather-description")
  .textContent = data.weather[0].description + " " + Math.round(data.main.temp) + "°C";

  document.getElementById("weather-icon")
  .setAttribute("src", "./img/icons/" + data.weather[0].icon + ".png");

  document.getElementById("weather-temp")
  .textContent = "Температура " + Math.round(data.main.temp) + "°C";

  document.getElementById("weather-feels")
  .textContent = "Ощущается как  " + Math.round(data.main.feels_like) + "°C";

  document.getElementById("weather-pressure")
  .textContent = "Давление " + Math.round(data.main.pressure / 1.333) + " мм ртутного столба";

  document.getElementById("weather-humidity")
  .textContent = "Влажность " + data.main.humidity + "%";

  document.getElementById("weather-wind-speed")
  .textContent = "Ветер " + data.wind.speed + " м/c";

  document.getElementById("weather-wind-deg")
  .textContent = "Направление ветра " + data.wind.deg + " градусов";

})