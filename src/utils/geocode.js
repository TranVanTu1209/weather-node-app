const request = require('request');
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidHV2YW50cmFuMTk5OCIsImEiOiJja2F5djhtN3EwNDJsMnlwOG5tdGRnaHdjIn0.7tdcM3_LXnC3QxiCjjw1Mg&limit=1`
  request({ url: url, json: true }, (err, { body }) => {
    if (err === true)
    {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0)
    {
      callback('Unable to find that location. Try again', undefined);
    } else
    {
      callback(undefined, {
        lat: body.features[0].center[0],
        long: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
}

module.exports = geoCode;