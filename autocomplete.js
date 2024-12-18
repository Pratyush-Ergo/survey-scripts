document.addEventListener('DOMContentLoaded', function () {
    // Wait until all survey elements are loaded
    var inputElement = document.querySelector('input[type="text"]');

    if (inputElement) {
        // Assign a unique ID to the existing input field for clarity
        inputElement.id = 'autocomplete-input';

        // Load Google Maps Places API
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
        script.async = true;
        script.defer = true;

        script.onload = function () {
            // Initialize the autocomplete with restriction to Australia
           var autocomplete = new google.maps.places.Autocomplete(inputElement, {
    types: ['geocode'],
    componentRestrictions: { country: 'AU' } // Restrict to Australia
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
    } else {
        console.error('Input element not found.');
    }
});
