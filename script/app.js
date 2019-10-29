let locationForm = document.querySelector('#location-form');

// Listen for submit
locationForm.addEventListener('submit', geocode);

function geocode(event) {
    // Prevent actual submit
    event.preventDefault();

    let location = document.querySelector('#location-input').value;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAWPYajaSklomoZAVmOuozzvnfK2srbVoM`)
        .then(function (response) {
            
            console.log(response);

            // coords
            let lat = response.data.results[0].geometry.location.lat;
            let lng = response.data.results[0].geometry.location.lng;

            console.log(lat, lng);

            let locationText = document.querySelector('.location-text');
            locationText.textContent = response.data.results[0].formatted_address;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            let api = `${proxy}http://api.weatherstack.com/current?access_key=c4db8878e27270c7e233fe2980948cff&query=${lat},${lng}`

            axios(api)
            .then(function (response) {
                console.log(response);

                let temperature = document.querySelector('.temperature');
                temperature.textContent = response.data.current.temperature;

                })
                .catch(function (error) {
                    console.log(error);
                });

        })
        .catch(function (error) {
            console.log(error);
        });
}