const proxy = "https://cors-anywhere.herokuapp.com/"
let locationForm = document.querySelector('#location-form');
let locationText = document.querySelector('.location-text');
let temperature = document.querySelector('.temperature');
let temperatureText = document.querySelector('.temperature-text');
let weatherIcon = document.querySelector('.weather-icon');
let weatherDescription = document.querySelector('.weather-description');
let windText = document.querySelector('.wind-text');
let windSpeed = document.querySelector('.wind-speed');
let myLocation = document.querySelector('.my-location');

let latt;
let long;

getLocation();

myLocation.addEventListener('click', getLocation);

// get my location
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((coords) => {
                resolve(coords);
            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    })

    // get coords of my locstion used Google Geocoder API
        .then((coords) => {
            latt = coords.coords.latitude;
            long = coords.coords.longitude;
            console.log(latt, long);

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latt},${long}&key=AIzaSyAWPYajaSklomoZAVmOuozzvnfK2srbVoM`)
                .then((response) => {

                    // show weather of my location
                    dispayWeather(response);
                })

                .catch((error) => {
                    console.log(error);
                });
        })
}
// Listen for submit
locationForm.addEventListener('submit', geocode);

// search for another city
function geocode(event) {

    // Prevent actual submit
    event.preventDefault();

    let location = document.querySelector('#location-input').value;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAWPYajaSklomoZAVmOuozzvnfK2srbVoM`)
        .then((response) => {

            console.log(response);

            // coords for another city
            latt = response.data.results[0].geometry.location.lat;
            long = response.data.results[0].geometry.location.lng;

            console.log(latt, long);

            dispayWeather(response);
        })

        .catch((error) => {
            console.log(error);
        });
}

function dispayWeather(response) {
    locationText.textContent = response.data.results[0].formatted_address;
    axios(`${proxy}http://api.weatherstack.com/current?access_key=c4db8878e27270c7e233fe2980948cff&query=${latt},${long}`)
        .then((response) => {
            console.log(response);

            temperature.textContent = response.data.current.temperature;
            temperatureText.textContent = "Temperature";

            let degree = document.createElement("span");
            degree.innerHTML = " &deg;C";
            degree.className = "degree"
            temperature.appendChild(degree);

            let icon = response.data.current.weather_icons[0];
            let iconDescription = response.data.current.weather_descriptions[0];
            weatherIcon.innerHTML = `<img src="${icon}"alt="${iconDescription}">`;
            weatherDescription.textContent = iconDescription;
            windSpeed.textContent = response.data.current.wind_speed;
            windText.textContent = "Wind speed";

            let speed = document.createElement("span");
            speed.textContent = " km/h";
            speed.className = "speed";
            windSpeed.appendChild(speed);
            


        })
        .catch((error) => {
            console.log(error);
        });

}