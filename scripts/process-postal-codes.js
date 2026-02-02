const fs = require('fs');
const path = require('path');

// Read allCountries.txt and extract postal codes
const inputFile = path.join(__dirname, '..', 'allCountries.txt');
const outputFile = path.join(__dirname, '..', 'lib', 'postal-codes.json');

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split('\n');

const postalCodes = {};

// Countries we want to process
const targetCountries = ['ES', 'DE', 'FR', 'IT', 'PT', 'NL', 'PL', 'AT', 'BE', 'CH'];

lines.forEach(line => {
  const parts = line.split('\t');
  if (parts.length >= 10) {
    const countryCode = parts[0];
    const postalCode = parts[1];
    const placeName = parts[2];
    const admin1 = parts[3]; // Region/State
    const latitude = parseFloat(parts[9]);
    const longitude = parseFloat(parts[10]);

    if (targetCountries.includes(countryCode) && postalCode && placeName) {
      if (!postalCodes[countryCode]) {
        postalCodes[countryCode] = {};
      }
      
      // Only keep first entry per postal code (avoid duplicates)
      if (!postalCodes[countryCode][postalCode]) {
        postalCodes[countryCode][postalCode] = {
          name: placeName,
          region: admin1,
          lat: latitude,
          lng: longitude
        };
      }
    }
  }
});

// Write output
fs.writeFileSync(outputFile, JSON.stringify(postalCodes, null, 2));

// Stats
let total = 0;
for (const country of Object.keys(postalCodes)) {
  const count = Object.keys(postalCodes[country]).length;
  console.log(`${country}: ${count} postal codes`);
  total += count;
}
console.log(`Total: ${total} postal codes`);
