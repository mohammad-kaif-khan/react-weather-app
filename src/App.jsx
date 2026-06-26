import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getWeather = async (lat, lon, cityName = "Current Location") => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7&timezone=auto`
      );

      const data = await res.json();

      setWeather({
        city: cityName,
        temp: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        code: data.current.weather_code,
      });

      const forecastData = data.daily.time.map((day, i) => ({
        day,
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        code: data.daily.weather_code[i],
      }));

      setForecast(forecastData);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (cityName) => {
    try {
      setLoading(true);

      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );

      const result = await geo.json();

      if (!result.results) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const cityData = result.results[0];

      setCity(cityData.name);

      getWeather(
        cityData.latitude,
        cityData.longitude,
        cityData.name
      );
    } catch {
      setError("City not found");
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        getWeather(28.6139, 77.2090, "Delhi");
      }
    );
  }, []);

  return (
    <div className="container">
      <h1>🌤 Weather App</h1>

      <SearchBar onSearch={searchCity} />

      {loading && <Loader />}

      {error && <p className="error">{error}</p>}

      {weather && !loading && (
        <>
          <WeatherCard weather={weather} />
          <Forecast forecast={forecast} />
        </>
      )}
    </div>
  );
}

export default App;