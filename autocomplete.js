document.addEventListener('DOMContentLoaded', function () {
    var inputElement = document.querySelector('input[type="text"]');

    if (inputElement) {
        inputElement.id = 'autocomplete-input';

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
        console.error('Input element not found.');
    }
});
