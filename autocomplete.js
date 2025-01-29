document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () { // Delay for dynamic content loading
        // Select the input field based on the unique attributes
        var inputElement = document.querySelector('input[name="oe174.0"][data-cell="QF5A_r1"]');

        if (inputElement) {
            console.log('Found input element:', inputElement);
            inputElement.id = 'autocomplete-input'; // Assign a consistent ID for the Places API

            // Load the Google Places API
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
            script.async = true;
            script.defer = true;

            script.onload = function () {
                var autocomplete = new google.maps.places.Autocomplete(inputElement, {
                    types: ['geocode'], // Restrict suggestions to addresses
                    componentRestrictions: { country: 'AU' }, // Restrict to Australia
                    strictBounds: true // Enable strict bounds
                });

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

            if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
                document.body.appendChild(script); // Append the Google Maps API script dynamically
            }
        } else {
            console.error('Input element for QF5A_r1 not found.');
        }
    }, 500); // .5-second delay to handle dynamic rendering
});
