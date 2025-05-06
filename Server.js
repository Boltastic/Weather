const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const WEATHER_API_KEY = 'afb1e52cb5b34a1d94d65557250605'; // your WeatherAPI.com key

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        aqi: 'no'
      }
    });

    const weather = weatherResponse.data;

    res.json({
      city: weather.location.name,
      country: weather.location.country,
      temperature: weather.current.temp_c,
      condition: weather.current.condition.text,
      humidity: weather.current.humidity,
      wind: weather.current.wind_kph
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});
