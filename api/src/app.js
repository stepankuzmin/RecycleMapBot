const express = require('express');
const bodyParser = require('body-parser');

const { syncDatabase, nearestPoint } = require('./db');
const { fetchPoints, welcome, showPoint } = require('./utils');

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
  const chatId = message.chat.id;

  if (message.location) {
    const { latitude, longitude } = message.location;
    const point = await nearestPoint(longitude, latitude);
    await showPoint(chatId, point);
  } else {
    await welcome(chatId);
  }

  res.send('ok');
});

module.exports = app;
