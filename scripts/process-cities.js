const fs = require('fs');
const path = require('path');

// Countries we want to include (mapped to our locale system)
const COUNTRY_MAPPING = {
  'ES': 'spain',
  'GB': 'uk',
  'US': 'usa',
  'DE': 'germany',
  'FR': 'france',
  'IT': 'italy',
  'NL': 'netherlands',
  'PT': 'portugal',
  'AT': 'austria',
  'CH': 'switzerland',
  'CA': 'canada',
  'AU': 'australia',
  'IE': 'ireland',
  'BE': 'belgium',
  'PL': 'poland',
  'CZ': 'czechia',
  'GR': 'greece',
  // Additional high-value countries
  'MX': 'mexico',
  'AR': 'argentina',
  'CO': 'colombia',
  'CL': 'chile',
  'PE': 'peru',
  'BR': 'brazil',
  'SE': 'sweden',
  'NO': 'norway',
  'DK': 'denmark',
  'FI': 'finland',
};

// Minimum population to include
const MIN_POPULATION = 3000;

// Read the cities file
const citiesFile = path.join(__dirname, '../lib/cities1000.txt');
const outputFile = path.join(__dirname, '../lib/cities-processed.json');

console.log('Reading cities file...');
const data = fs.readFileSync(citiesFile, 'utf8');
const lines = data.split('\n');

console.log(`Processing ${lines.length} cities...`);

const citiesByCountry = {};
let totalCities = 0;

for (const line of lines) {
  if (!line.trim()) continue;
  
  const cols = line.split('\t');
  if (cols.length < 15) continue;
  
  const name = cols[1];
  const asciiName = cols[2];
  const countryCode = cols[8];
  const population = parseInt(cols[14]) || 0;
  
  // Skip if country not in our list
  const countryKey = COUNTRY_MAPPING[countryCode];
  if (!countryKey) continue;
  
  // Skip if population too low
  if (population < MIN_POPULATION) continue;
  
  // Create slug from ASCII name
  const slug = asciiName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  if (!slug) continue;
  
  // Initialize country array if needed
  if (!citiesByCountry[countryKey]) {
    citiesByCountry[countryKey] = [];
  }
  
  citiesByCountry[countryKey].push({
    name,
    slug,
    population
  });
  
  totalCities++;
}

// Sort each country's cities by population (descending)
for (const country of Object.keys(citiesByCountry)) {
  citiesByCountry[country].sort((a, b) => b.population - a.population);
}

// Write output
console.log(`\nWriting ${totalCities} cities to ${outputFile}...`);
fs.writeFileSync(outputFile, JSON.stringify(citiesByCountry, null, 2));

// Print summary
console.log('\n=== SUMMARY ===');
for (const [country, cities] of Object.entries(citiesByCountry)) {
  console.log(`${country}: ${cities.length} cities`);
}
console.log(`\nTOTAL: ${totalCities} cities`);
console.log('\nDone! Now update seo-data.ts to import from cities-processed.json');
