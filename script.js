// Initialize map — dark theme, centered on northern hemisphere
const map = L.map('map', {
    worldCopyJump: true,
    zoomControl: true,
    minZoom: 4
}).setView([50, 15], 4);

// CartoDB Dark Matter — clean dark map with subtle borders & English labels at zoom 4+
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

let marker;

// Handle map click
map.on('click', function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    if (marker) {
        marker.setLatLng(e.latlng);
        marker.unbindTooltip();
    } else {
        marker = L.circleMarker(e.latlng, {
            radius: 10,
            color: '#7efcff',
            fillColor: '#7efcff',
            fillOpacity: 0.5,
            weight: 2
        }).addTo(map);
    }

    marker.bindTooltip(`Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95,
        className: 'click-tooltip'
    }).openTooltip();

    checkAurora(lat, lng);
});

async function checkAurora(lat, lng) {
    const result = document.getElementById("result");
    const aurora = document.getElementById("aurora");

    result.classList.remove('visible');

    let text = "";
    let intensity = 0.3;

    if (Math.abs(lat) >= 60) {
        text = `🌈 High chance of Aurora at ${lat.toFixed(2)}°, ${lng.toFixed(2)}°!`;
        intensity = 0.92;
    } else if (Math.abs(lat) >= 40) {
        text = `⚡ Medium chance of Aurora at ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
        intensity = 0.68;
    } else {
        text = `❌ Low chance of Aurora at ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
        intensity = 0.35;
    }

    setTimeout(() => {
        result.innerText = text;
        result.classList.add('visible');
        aurora.style.opacity = intensity;
    }, 180);
}