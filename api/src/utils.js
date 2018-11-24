const axios = require('axios');
const querystring = require('querystring');

const { TELEGRAM_API_TOKEN } = process.env;
const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`;

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

const reply = (message, text) =>
  axios.post(telegramUrl, { chat_id: message.chat.id, text });

module.exports = { fetchPoints, reply };
