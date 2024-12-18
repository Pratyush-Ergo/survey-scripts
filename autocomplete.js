document.addEventListener('DOMContentLoaded', function () {
    var inputElement = document.querySelector('input[type="text"]');

    if (inputElement) {
        inputElement.id = 'autocomplete-input';

        // Load Google Maps Places API
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ&libraries=places';
        script.async = true;
        script.defer = true;

        script.onload = function () {
            var autocomplete = new google.maps.places.Autocomplete(inputElement, {
                types: ['geocode'],
                componentRestrictions: { country: 'AU' },
                strictBounds: true
            });

            let validPlaceSelected = false;
            let validationInProgress = false; // To prevent repeated blur handling

            // Event listener for when a place is selected
            autocomplete.addListener('place_changed', function () {
                var selectedPlace = autocomplete.getPlace();
                if (selectedPlace.geometry) {
                    console.log('Selected Place:', selectedPlace.name);
                    console.log('Formatted Address:', selectedPlace.formatted_address);
                    console.log('Latitude:', selectedPlace.geometry.location.lat());
                    console.log('Longitude:', selectedPlace.geometry.location.lng());
                    validPlaceSelected = true;
                }
            });

            // Validate input when the user attempts to leave the input field
            inputElement.addEventListener('blur', function () {
                if (!validPlaceSelected && !validationInProgress) {
                    validationInProgress = true; // Set flag to prevent repeated handling

                    alert('Please select a valid address from the dropdown list.');
                    inputElement.value = ''; // Clear the input field

                    // Delay the focus to prevent immediate blur triggering
                    setTimeout(() => {
                        inputElement.focus();
                        validationInProgress = false; // Reset the flag after focusing
                    }, 0);
                }
            });

            // Reset the flag if the user modifies the input manually
            inputElement.addEventListener('input', function () {
                validPlaceSelected = false;
            });
        };

        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
            document.body.appendChild(script);
        }
    } else {
        console.error('Input element not found.');
    }
});
