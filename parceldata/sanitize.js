const fs = require('fs');

// Read the GeoJSON file
const data = JSON.parse(fs.readFileSync('mdc-simple.geojson', 'utf8'));

// Iterate over each feature and sanitize the dor_desc property
data.features.forEach(feature => {
    if (feature.properties && feature.properties.dor_desc) {
        feature.properties.dor_desc = feature.properties.dor_desc.replace(/[\/\\:]/g, "-").replace(/\s+/g, "_");
    }
});

// Write the sanitized data back to a new file
fs.writeFileSync('temp.geojson', JSON.stringify(data), 'utf8');

console.log('Sanitization complete.');
