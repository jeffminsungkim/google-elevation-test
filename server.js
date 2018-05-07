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

app.get('/elevation/:name', (req, res) => {
  const courseName = req.params.name;

  m.getElevation(m.getEntireLocationsByCourse(courseName)).then((response) => {
    const path = `./data/elevation/HammockDunes/${courseName}/data.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/left-green/hole/:hid', (req, res) => {
  const hid = req.params.hid;

  m.getElevation(m.getSingleGreenLocationByHoleId(hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/single/green/left_green_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/greens/all', (req, res) => {
  m.getElevation(m.getMultiGreenLocationsByEntireHoles()).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/batch/green/all.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/greens/hole/:hid', (req, res) => {
  const hid = req.params.hid;

  m.getElevation(m.getMultiGreenLocationsByEachHole(hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/batch/green/green_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/tboxes/all', (req, res) => {
  m.getElevation(m.getMultiTboxLocationsByEntireHoles()).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/batch/tbox/all.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/tboxes/hole/:hid', (req, res) => {
  const hid = req.params.hid;

  m.getElevation(m.getMultiTboxLocationsByEachHole(hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/batch/tbox/tbox_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});

app.get('/elevation/tboxes/:tid/hole/:hid', (req, res) => {
  const hid = req.params.hid;
  const tid = req.params.tid;

  m.getElevation(m.getSingleTboxLocationByHoleId(tid, hid)).then((response) => {
    const path = `./data/elevation/HammockDunes/ReesJonesCreek/single/tbox/t${tid}_hole_${hid}.json`;

    m.saveElevationAsJSON(path, response);
    res.send(response);
  }).catch(err => console.error(err));
});
