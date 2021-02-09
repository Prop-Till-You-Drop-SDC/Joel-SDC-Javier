/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
// const controllers = require('./controllers');
const helpers = require('./routes/controller.js')

const app = express();

// compress all responses to optimize page load speed
app.use(compression());

// app.use(cors({
//   origin: 'http://54.157.193.11:8000/',
// }));

// app.use('/bundle', cors(), express.static(path.join(__dirname, '/../client/public/bundle.js')));
// app.use('/', cors(), express.static(path.join(__dirname, '/../client/public')));
app.use(express.static(path.join(__dirname, '/../client/public')))

// app.get('/reviews/:id', cors(), controllers.reviews.get);

app.get('/reviews/:id', (req, res) => {
  let id = req.params.id
  console.log(req.params)
  helpers.findOne(id, (result) => {
    console.log(result)
    res.send(result)
  })
})

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
