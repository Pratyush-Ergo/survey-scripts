document.addEventListener('DOMContentLoaded', function () {
    // Create an input element for the autocomplete
    var inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'autocomplete-input';
    inputElement.placeholder = 'Enter a location...';
    inputElement.style.width = '100%';
    inputElement.style.padding = '8px';

    // Append the input element to the Forsta question container
    var questionContainer = document.querySelector('.surveyQuestion');
    if (questionContainer) {
        questionContainer.appendChild(inputElement);
    }

    // Load Google Maps Places API
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
    script.async = true;
    script.defer = true;
    script.onload = function () {
        // Initialize the autocomplete
        var autocomplete = new google.maps.places.Autocomplete(inputElement, {
            types: ['geocode'] // Customize this as needed
        });

        // Handle place selection
        autocomplete.addListener('place_changed', function () {
            var selectedPlace = autocomplete.getPlace();
            if (selectedPlace.geometry) {
                console.log('Selected Place:', selectedPlace.name);
                console.log('Formatted Address:', selectedPlace.formatted_address);
                console.log('Latitude:', selectedPlace.geometry.location.lat());
                console.log('Longitude:', selectedPlace.geometry.location.lng());
            }
        });
    };

    document.body.appendChild(script);
});
