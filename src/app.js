const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { dirname } = require('path');

// defines paths for express configure
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handle bars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve html
app.use(express.static(publicDirectoryPath));
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Tu Van Tran'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    description: 'We are groot'
  });
});
app.get('/header', (req, res) => {
  res.render('header', {
    title: 'Weather App',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Services',

  })
})

app.get('/weather', (req, response) => {
  if (!req.query.location)
  {
    res.send({
      error: 'You must provide a search term'
    });
  } else
  {
    geocode(req.query.location, (err, { lat, long, location } = {}) => {
      if (err)
      {
        return console.log(err);
      }
      else
      {
        forecast(parseInt(lat), parseInt(long), (err, res) => {
          if (err)
          {
            response.send({
              err: 'none'
            });
          }
          response.send({
            forecast: res.weather_descriptions[0],
            location: location,
            temperature: res.temperature,
            feelslike: res.feelslike
          });
        });
      }
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('help_article', {
    title: 'Article Not Found'
  });
})
app.get('*', (req, res) => {
  res.render('404_error', {
    title: 'Page not found'
  });
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server was running on PORT ${PORT}`));