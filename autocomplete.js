document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () { // Add a delay to ensure dynamic content loads
        // Target the open text input for "Enter your address here" in QF5A
        var inputElement = document.querySelector('input[name="ans160.0.0"][type="text"]');

        if (inputElement) {
            console.log('Found input element for QF5A:', inputElement);
            inputElement.id = 'autocomplete-input'; // Assign a consistent ID

            // Load the Google Places API
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
            script.async = true;
            script.defer = true;

            script.onload = function () {
                var autocomplete = new google.maps.places.Autocomplete(inputElement, {
                    types: ['geocode'], // Limit suggestions to addresses
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
                document.body.appendChild(script); // Append the Google Maps script dynamically
            }
        } else {
            console.error('Input element for QF5A not found.');
        }
    }, 1000); // Delay for dynamic survey platforms
});
