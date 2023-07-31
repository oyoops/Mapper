let infoWindow;

let latty = 27.6648;
let longy = -81.5158;

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: latty, lng: longy }
    });

    // Singleton InfoWindow
    infoWindow = new google.maps.InfoWindow();

    loadGeoJSON(map);
}

function loadGeoJSON(map) {
    fetch('path_to_your_geojson_file.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.features.forEach(feature => {
                const polygon = new google.maps.Polygon({
                    paths: feature.geometry.coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })),
                    map: map
                });

                google.maps.event.addListener(polygon, 'click', function (event) {
                    showParcelInfo(event, feature.properties);
                });
            });
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation:', error.message);
        });
}

function showParcelInfo(event, properties) {
    infoWindow.setContent(JSON.stringify(properties));
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
}

// Call initMap once the script loads
google.maps.event.addDomListener(window, 'load', initMap);
