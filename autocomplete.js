document.addEventListener('DOMContentLoaded', function () {
    var inputElement = document.querySelector('input[type="text"]');
    let lastValidPlace = null;

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

            // Event listener for when a place is selected
            autocomplete.addListener('place_changed', function () {
                var selectedPlace = autocomplete.getPlace();
                if (selectedPlace.geometry) {
                    lastValidPlace = selectedPlace;
                    console.log('Selected Place:', selectedPlace.formatted_address);
                }
            });

            // Validate when the user submits the form or presses Enter
            inputElement.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent default form submission
                    validateInput();
                }
            });
        };

        // Function to validate the input
        function validateInput() {
            if (!lastValidPlace) {
                alert('Please select a valid address from the dropdown list.');
                inputElement.value = ''; // Clear the input field
                inputElement.focus();
            }
        }
    } else {
        console.error('Input element not found.');
    }
});
