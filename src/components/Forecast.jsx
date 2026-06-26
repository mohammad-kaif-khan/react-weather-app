function getIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️";
  if ([71, 73, 75].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";

  return "☁️";
}

function Forecast({ forecast }) {
  return (
    <div className="forecast">

      <h2>7 Days Forecast</h2>

      <div className="forecast-grid">

        {forecast.map((day) => (

          <div className="forecast-card" key={day.day}>

            <h4>
              {new Date(day.day).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h4>

            <div className="forecast-icon">
              {getIcon(day.code)}
            </div>

            <p>⬆ {day.max}°C</p>

            <p>⬇ {day.min}°C</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Forecast;