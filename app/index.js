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
  getMultiTboxLocationsByEntireHoles,
  getMultiTboxLocationsByEachHole,
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

function getSingleGreenLocationByHoleId(id) {
  return hammockDunes.ReesJonesCreek[id].coordinates.gCoordinates;
}

function getSingleTboxLocationByHoleId(tid, hid) {
  return hammockDunes.ReesJonesCreek[hid].coordinates[`t${tid}Coordinates`];
}

function getMultiGreenLocationsByEntireHoles() {
  const coordinates = [];

  for (let i = 0; i < hdLength; i++)
    coordinates.push(hammockDunes.ReesJonesCreek[i].coordinates.gCoordinates);

  return coordinates;
}

function getMultiTboxLocationsByEntireHoles() {
  const coordinates = [];

  for (let i = 0; i < hdLength; i++) {
    for (let key in hammockDunes.ReesJonesCreek[i].coordinates) {
      if (hammockDunes.ReesJonesCreek[i].coordinates.hasOwnProperty(key))
        coordinates.push(hammockDunes.ReesJonesCreek[i].coordinates[key]);
    }
  }

  return coordinates;
}

function getMultiTboxLocationsByEachHole(hid) {
  const coordinates = [];
  const holeCoordinate = hammockDunes.ReesJonesCreek[hid].coordinates;

  for (let key in holeCoordinate) {
    if (holeCoordinate.hasOwnProperty(key))
      coordinates.push(holeCoordinate[key]);
  }

  return coordinates;
}
