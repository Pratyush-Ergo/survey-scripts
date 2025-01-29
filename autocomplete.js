document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () { // Add a delay to ensure elements are fully loaded
        // Select the input by its id or name
        var inputElement = document.querySelector('input[name="ans160.0.0"], input[id="ans160.0.0"]');

        if (inputElement) {
            console.log('Found input element:', inputElement);
            inputElement.id = 'autocomplete-input'; // Assign a consistent ID for autocomplete
            
            // Load the Google Places API
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
            script.async = true;
            script.defer = true;

            script.onload = function () {
                var autocomplete = new google.maps.places.Autocomplete(inputElement, {
                    types: ['geocode'],
                    componentRestrictions: { country: 'AU' },
                    strictBounds: true
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
                document.body.appendChild(script);
            }
        } else {
            console.error('Input element for QF5A not found.');
        }
    }, 1000); // Add a 1-second delay to ensure dynamic content loads
});
