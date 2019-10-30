let locationForm = document.querySelector('#location-form');
let locationText = document.querySelector('.location-text');
let temperature = document.querySelector('.temperature');
let latt;
let long;

let degree = document.createElement("span");
degree.innerHTML = "C";
degree.className = "degree"

// Listen for submit
locationForm.addEventListener('submit', geocode);

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
}

getLocation().then((coords) => {
    latt = coords.coords.latitude;
    long = coords.coords.longitude;
    console.log(latt, long);

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latt},${long}&key=AIzaSyAWPYajaSklomoZAVmOuozzvnfK2srbVoM`)
        .then((response) => {

            locationText.textContent = response.data.results[2].formatted_address;

            axios(`https://api.weatherstack.com/current?access_key=c4db8878e27270c7e233fe2980948cff&query=${latt},${long}`)
                .then((response) => {
                    console.log(response);

                    temperature.textContent = response.data.current.temperature;
                    temperature.appendChild(degree);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
})

function geocode(event) {
    // Prevent actual submit
    event.preventDefault();

    let location = document.querySelector('#location-input').value;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAWPYajaSklomoZAVmOuozzvnfK2srbVoM`)
        .then((response) => {

            console.log(response);

            // coords
            latt = response.data.results[0].geometry.location.lat;
            long = response.data.results[0].geometry.location.lng;

            console.log(latt, long);

            locationText.textContent = response.data.results[0].formatted_address;

            axios(`https://api.weatherstack.com/current?access_key=c4db8878e27270c7e233fe2980948cff&query=${latt},${long}`)
                .then((response) => {
                    console.log(response);

                    temperature.textContent = response.data.current.temperature;
                    temperature.appendChild(degree);
                })
                .catch((error) => {
                    console.log(error);
                });

        })
        .catch((error) => {
            console.log(error);
        });
}