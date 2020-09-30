console.log("connected")


// vars
let longitude;
let latitude;
var weatherBox = $("#weatherbox");


// function definitions

navigator.geolocation.getCurrentPosition(getLocation);

function getLocation(pos) {
    var crd = pos.coords;
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
  longitude = Math.round(`${crd.longitude}`);
  latitude = Math.round( `${crd.latitude}`);

  getCurrentWeather(longitude, latitude);
  }


function getCurrentWeather() {

    console.log(longitude)
    console.log(latitude)

    var key = "2fd6a7c1addf009b30af95d20e54bde2";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + key;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // console.log(response);
        currentWeatherObj = response
        currentWeatherIcon = currentWeatherObj.weather[0].icon;
        // console.log(currentWeatherIcon);
        // console.log(currentWeatherObj)
        displayCurrentWeather(currentWeatherObj);
    });
}

function displayCurrentWeather() {
    console.log(currentWeatherObj);

    let currentTemp = currentWeatherObj.main.temp;
    let maxTemp = currentWeatherObj.main.temp_max;
    let currentWeather = currentWeatherObj.weather[0].main;
    let weatherIcon = currentWeatherObj.weather[0].icon;


    var weatherImg = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png").attr("id", "weatherImg");
    var descriptionTxt = $("<h3>").text("Current Condintion: " + currentWeather).attr("class", "weatherTxt");
    var temp = $("<h3>").text("Current Temp: " + currentTemp).attr("class", "weatherTxt");
    var maxTempTxt = $("<h3>").text("Today's High: " + maxTemp).attr("class", "weatherTxt");


    $(weatherBox).append(weatherImg);
    $(weatherBox).append(descriptionTxt);
    $(weatherBox).append(temp)
    $(weatherBox).append(maxTempTxt);


}

// function calls

// getLocation();
// getCurrentWeather();

