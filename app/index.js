const Promise = require('bluebird');
const fs = require('fs');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

module.exports = {
  getElevation,
  saveElevationAsJSON
}

function getElevation (coordinates) {
  return new Promise((resolve, reject) => {
    googleMapsClient.elevation({
      locations: coordinates
    }, (err, response) => {
      if (err) return reject(err);

      return resolve(response.json.results);
    });
  });
}

function saveElevationAsJSON(path, response) {
  fs.writeFile(path, JSON.stringify(response), (err) => {
    if (err) console.log('FS error:', err);
  });
}
