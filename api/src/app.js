const express = require('express');
const bodyParser = require('body-parser');

const { fetchPoints, reply } = require('./utils');
const { syncDatabase, nearestPoint } = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/sync', async (req, res) => {
  const points = await fetchPoints();
  await syncDatabase(points);
  res.send('ok');
});

app.post('/find', async (req, res) => {
  const { lng, lat } = req.body;
  const point = await nearestPoint(lng, lat);
  res.send(point);
});

app.post('/start', async (req, res) => {
  const { message } = req.body;

  const text = 'Welcome to RecycleMap Bot!';
  await reply(message, text);

  res.send('ok');
});

module.exports = app;
