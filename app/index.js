const Promise = require('bluebird');
const fs = require('fs');
const hammockDunes = require('../data/fixtures/hammock_dunes');
const hdLength = Object.keys(hammockDunes.ReesJonesCreek).length;
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});

module.exports = {
  getElevation,
  getSingleGreenLocationByHoleId,
  getSingleTboxLocationByHoleId,
  getMultiGreenLocationsByEntireHoles,
  getMultiGreenLocationsByEachHole,
  getMultiTboxLocationsByEntireHoles,
  getMultiTboxLocationsByEachHole,
  getEntireLocationsByCourse,
  saveElevationAsJSON
}

function getElevation(coordinates) {
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
    if (err) console.log('saveElevationAsJSON Error:', err);
  });
}

function getSingleGreenLocationByHoleId(hid) {
  return hammockDunes.ReesJonesCreek[hid].coordinates.gCoordinates;
}

function getSingleTboxLocationByHoleId(tid, hid) {
  return hammockDunes.ReesJonesCreek[hid].coordinates[`t${tid}Coordinates`];
}

function getMultiGreenLocationsByEntireHoles() {
  const coordinates = [];

  for (let i = 0; i < hdLength; i++) {
    for (let key in hammockDunes.ReesJonesCreek[i].coordinates) {
      if (hammockDunes.ReesJonesCreek[i].coordinates.hasOwnProperty(key) && key.startsWith('g'))
        coordinates.push(hammockDunes.ReesJonesCreek[i].coordinates[key]);
    }
  }

  return coordinates;
}

function getMultiGreenLocationsByEachHole(hid) {
  const coordinates = [];

  for (let key in hammockDunes.ReesJonesCreek[hid].coordinates) {
    if (hammockDunes.ReesJonesCreek[hid].coordinates.hasOwnProperty(key) && key.startsWith('g'))
      coordinates.push(hammockDunes.ReesJonesCreek[hid].coordinates[key]);
  }

  return coordinates;
}

function getMultiTboxLocationsByEntireHoles() {
  const coordinates = [];

  for (let i = 0; i < hdLength; i++) {
    for (let key in hammockDunes.ReesJonesCreek[i].coordinates) {
      if (hammockDunes.ReesJonesCreek[i].coordinates.hasOwnProperty(key) && key.startsWith('t'))
        coordinates.push(hammockDunes.ReesJonesCreek[i].coordinates[key]);
    }
  }

  return coordinates;
}

function getMultiTboxLocationsByEachHole(hid) {
  const coordinates = [];

  for (let key in hammockDunes.ReesJonesCreek[hid].coordinates) {
    if (hammockDunes.ReesJonesCreek[hid].coordinates.hasOwnProperty(key) && key.startsWith('t'))
      coordinates.push(hammockDunes.ReesJonesCreek[hid].coordinates[key]);
  }

  return coordinates;
}

function getEntireLocationsByCourse(name) {
  const coordinates = [];
  const len = Object.keys(hammockDunes[name]).length;

  for (let i = 0; i < len; i++) {
    for (let key in hammockDunes[name][i].coordinates) {
      if (hammockDunes[name][i].coordinates.hasOwnProperty(key))
        coordinates.push(hammockDunes[name][i].coordinates[key]);
    }
  }

  return coordinates;
}
