const hammockDunes = require('../data/fixtures/hammock_dunes');
const hdLength = Object.keys(hammockDunes.ReesJonesCreek).length;
const spGreen = require('../data/elevation/HammockDunes/ReesJonesCreek/single/green/left_green_hole_0');
const mpAllGreens = require('../data/elevation/HammockDunes/ReesJonesCreek/batch/green/all');
const mpAllTboxes = require('../data/elevation/HammockDunes/ReesJonesCreek/batch/tbox/all');
const rjcCourse = require('../data/elevation/HammockDunes/ReesJonesCreek/data');

describe("HammockDunes, ReesJonesCreek Left Green Test", () => {
  const singleGreenElevation = spGreen.map(res => res.elevation);
  const entireGreenElevations = mpAllGreens.map(res => res.elevation);

  it("should return the same elevation -> Entire green points and Single green point request", () => {
    expect(singleGreenElevation[0]).toEqual(entireGreenElevations[0]);
    expect(mergeGreenPointsByEachHole()).toEqual(extractLeftGreenPoints(entireGreenElevations));
  });
});

describe("HammockDunes, ReesJonesCreek Entire locations including tboxes", () => {
  const courseElevation = rjcCourse.map(res => res.elevation);
  const entireGreenElevation = mpAllGreens.map(res => res.elevation);
  const entireTBoxElevations = mpAllTboxes.map(res => res.elevation);

  // it("should return the same elevation -> Green locations and Tboxes locations", () => {
  //   console.log('courseele', courseElevation);
  //   expect(courseElevation).toEqual(mergeGreenElevationsWithTBoxElevations(entireGreenElevation, entireTBoxElevations));
  // });
});

// function mergeGreenElevationsWithTBoxElevations(greenElevation, tBoxElevation) {
//   for (let i = 3; i < tBoxElevation.length; i += 3) {
//     for (let j = 0; j < i; j++) {
//       greenElevation.splice(i, 0, tBoxElevation[j]);
//     }
//   }

//   console.log('greenElevation', greenElevation);

//   return greenElevation;
// }

function extractLeftGreenPoints(coordinates) {
  const greenPoints = [];

  for (let i = 0; i < coordinates.length; i += 3)
    greenPoints.push(coordinates[i]);

  return greenPoints;
}

function mergeGreenPointsByEachHole() {
  const coordinates = [];

  for (let i = 0; i < hdLength; i++) {
    const spGreen = require(`../data/elevation/HammockDunes/ReesJonesCreek/single/green/left_green_hole_${i}`);
    coordinates.push(spGreen.map(res => res.elevation)[0]);
  }

  return coordinates;
}
