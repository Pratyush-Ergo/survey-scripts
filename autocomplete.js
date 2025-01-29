document.addEventListener('DOMContentLoaded', function () {
    // Wait for DOM to fully load before proceeding
    var inputElement = document.querySelector('input[data-cell="QF5A_r1"]'); // Use the 'data-cell' attribute for accurate selection

    if (inputElement) {
        console.log("Found input element:", inputElement);

        // Set an ID to the input element for initialization
        inputElement.id = 'autocomplete-input';

        // Load the Google Places API script
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
        script.async = true;
        script.defer = true;

        // When the script loads, initialize Google Places API
        script.onload = function () {
            var autocomplete = new google.maps.places.Autocomplete(inputElement, {
                types: ['geocode'], // Restrict results to geocoded addresses
                componentRestrictions: { country: 'AU' }, // Restrict results to Australia
                strictBounds: true
            });

            // Add an event listener to capture the selected place
            autocomplete.addListener('place_changed', function () {
                var selectedPlace = autocomplete.getPlace();
                if (selectedPlace.geometry) {
                    console.log('Selected Place:', selectedPlace.name);
                    console.log('Formatted Address:', selectedPlace.formatted_address);
                    console.log('Latitude:', selectedPlace.geometry.location.lat());
                    console.log('Longitude:', selectedPlace.geometry.location.lng());
                } else {
                    console.log('No geometry information available for the selected place.');
                }
            });
        };

        // Ensure the script is not already loaded before appending
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
            document.body.appendChild(script);
        }
    } else {
        console.error('Input element for "QF5A_r1" not found.');
    }
});
