require('dotenv').config();
const app = require('./app/app');
const m = require('./app/index');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Dev server listening on ${port}`);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/test-elevation', (req, res) => {
  m.getElevation({
    lat: 40.7118,
    lng: -111.9679
  }).then((response) => {
    const path = './data/elevation/test.json';
    console.log('RESPONSE:', response);
    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/green/:hid', (req, res) => {
  const hid = req.params.hid;

  m.getElevation(m.getSingleGreenLocationByHoleId(hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/sp/green/green_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/green/all', (req, res) => {
  m.getElevation(m.getMultiGreenLocationsByEntireHoles()).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/mp/green/green.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/tbox/all', (req, res) => {
  m.getElevation(m.getMultiTboxLocationsByEntireHoles()).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/mp/tbox/all_holes.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/tbox/all/hole/:hid', (req, res) => {
  const hid = req.params.hid;

  m.getElevation(m.getMultiTboxLocationsByEachHole(hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/mp/tbox/all_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/tbox/:tid/hole/:hid', (req, res) => {
  const hid = req.params.hid;
  const tid = req.params.tid;

  m.getElevation(m.getSingleTboxLocationByHoleId(tid, hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/sp/tbox/t${tid}_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});
