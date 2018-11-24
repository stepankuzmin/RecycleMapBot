const axios = require('axios');
const querystring = require('querystring');

const { TELEGRAM_API_TOKEN } = process.env;
const sendMessageUrl = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`;
const sendVenueUrl = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendVenue`;

const url =
  'https://recyclemap.ru/index.php?option=com_greenmarkers&task=get_json&type=points&tmpl=component';

const fetchPoints = async () => {
  const params = {
    city: 1,
    layer: 0,
    gos: 0
  };

  const points = await axios
    .post(url, querystring.stringify(params))
    .then(({ data }) => Object.values(data));

  return points;
};

const welcome = chatId =>
  axios.post(sendMessageUrl, {
    chat_id: chatId,
    text: 'Welcome to RecycleMap Bot!',
    reply_markup: {
      keyboard: [
        [{ text: 'Show me nearest recycle point', request_location: true }]
      ]
    }
  });

const showPoint = (chatId, point) =>
  axios.post(sendVenueUrl, {
    chat_id: chatId,
    title: point.title,
    address: point.address,
    latitude: point.latitude,
    longitude: point.longitude,
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Show me another recycle point',
            request_location: true
          }
        ]
      ]
    }
  });

module.exports = { fetchPoints, welcome, showPoint };
