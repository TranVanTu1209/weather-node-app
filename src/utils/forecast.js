const request = require('request');

const getForecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c9f0947fd0fd1978dbdfe272b1a0a1ca&query=${lat},${long}&units=m`;
  request({ url: url, json: true }, (err, { body }) => {
    if (err)
    {
      callback('Unable to connect to location services', undefined);
    } else if (body.error)
    {
      callback('Unable to find the location. Try again', undefined);
    } else
    {
      var data = body.current;
      callback(undefined, data);
    }
  });
}

module.exports = getForecast;