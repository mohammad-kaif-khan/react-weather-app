function WeatherCard({ weather }) {
  return (
    <div className="weather-card">

      <h2>Current Weather</h2>

      <div className="temp">
        {weather.temp}°C
      </div>

      <div className="details">

        <div>
          💧 Humidity
          <p>{weather.humidity}%</p>
        </div>

        <div>
          💨 Wind
          <p>{weather.wind} km/h</p>
        </div>

      </div>

    </div>
  );
}

export default WeatherCard;