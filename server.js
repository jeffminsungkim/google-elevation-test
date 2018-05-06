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
