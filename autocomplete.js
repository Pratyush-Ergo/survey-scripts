document.addEventListener('DOMContentLoaded', function () {
    // Select the first Forsta text input field (e.g., q1)
    var inputElement = document.querySelector('input[type="text"]');

    if (inputElement) {
        // Ensure the input field has a unique ID for clarity
        inputElement.id = 'autocomplete-input';

        // Load Google Maps Places API
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
        script.async = true;
        script.defer = true;
        
        script.onload = function () {
            // Initialize the autocomplete on the selected input field
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

        // Append the script to the document body
        document.body.appendChild(script);
    } else {
        console.error('Input element not found.');
    }
});
