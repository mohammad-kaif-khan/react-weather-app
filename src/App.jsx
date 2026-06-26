import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }, []);

  async function getWeather(lat, lon) {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`;

    const res = await fetch(url);

    const data = await res.json();

    setWeather({
      temp: data.current.temperature_2m,
      wind: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
    });

    const days = data.daily.time.map((day, i) => ({
      day,
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
    }));

    setForecast(days);
  }

  async function searchCity(city) {
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const result = await geo.json();

    if (!result.results) {
      alert("City not found");
      return;
    }

    getWeather(
      result.results[0].latitude,
      result.results[0].longitude
    );
  }

  return (
    <div className="container">

      <h1>Weather App</h1>

      <SearchBar onSearch={searchCity} />

      {weather && <WeatherCard weather={weather} />}

      {forecast.length > 0 && (
        <Forecast forecast={forecast} />
      )}

    </div>
  );
}

export default App;