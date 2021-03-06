const text = document.getElementById('text');
const weatherInfo = document.getElementById('weather-info');
if (weatherInfo)
{
  weatherInfo.style.display = 'none';
}
function getWeather(text) {
  if (text)
  {
    fetch(`/weather?location=${text}`)
      .then(res => res.json())
      .then(data => {
        if (data.error)
        {
          console.log(data.error)
        } else
        {
          weatherInfo.innerHTML = `
            <h5>
              The weather at ${data.location} is : 
            </h5>
            <p>
              Temperature : ${data.temperature}
            </p>
            <p>
              It is ${data.forecast}
            </p>
            <p>
              The temperature feel likes is ${data.feelslike}
            </p>
          `;
          if (weatherInfo)
          {
            weatherInfo.style.display = 'block';
          }
        }
      });
  } else
  {
    alert('Please fill out the text box');
  }
}
if (document.querySelector('#get-btn'))
{
  document.querySelector('#get-btn').addEventListener('click', e => {
    e.preventDefault();
    getWeather(text.value);
    text.value = '';
  });
}
