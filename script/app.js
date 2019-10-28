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

        })
        .catch(function (error) {
            console.log(error);
        });
}