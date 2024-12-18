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
document.addEventListener('DOMContentLoaded', function () {
    var inputElement = document.querySelector('input[type="text"]');
    const geocodingAPIKey = 'AIzaSyBJzSqGu47VuspJ5GjB1UpYyQRzuzDSSxQ'; // Replace with your Google Maps API key

    if (inputElement) {
        inputElement.id = 'autocomplete-input';

        // Load Google Maps Places API
        var script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${geocodingAPIKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = function () {
            var autocomplete = new google.maps.places.Autocomplete(inputElement, {
                types: ['geocode'],
                componentRestrictions: { country: 'AU' }, // Restrict to Australia
                strictBounds: true
            });

            // Event listener for when a place is selected
            autocomplete.addListener('place_changed', function () {
                var selectedPlace = autocomplete.getPlace();
                if (selectedPlace.geometry) {
                    console.log('Selected Place:', selectedPlace.formatted_address);
                }
            });
        };

        // Validate input on blur or Enter key press
        function validateAddress() {
            const address = inputElement.value.trim();
            if (address) {
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${geocodingAPIKey}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK' && data.results.length > 0) {
                            const formattedAddress = data.results[0].formatted_address;
                            console.log('Validated Address:', formattedAddress);
                        } else {
                            alert('Please enter a valid address.');
                            inputElement.value = ''; // Clear the input field
                            inputElement.focus(); // Refocus the input field
                        }
                    })
                    .catch(error => {
                        console.error('Error validating address:', error);
                        alert('An error occurred while validating the address. Please try again.');
                    });
            }
        }

        // Validate on blur
        inputElement.addEventListener('blur', validateAddress);

        // Validate on Enter key press
        inputElement.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                validateAddress();
            }
        });

        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
            document.body.appendChild(script);
        }
    } else {
        console.error('Input element not found.');
    }
});
