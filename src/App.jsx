// App.jsx
import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;


  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=he`
      );
      if (!res.ok) throw new Error("עיר לא נמצאה");
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e0f7fa", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>בדיקת מזג אוויר</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="הכנס שם עיר"
        style={{ padding: "0.5rem", fontSize: "1rem", width: "200px", marginRight: "0.5rem" }}
      />
      <button onClick={getWeather} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>חפש</button>

      <div style={{ marginTop: "2rem" }}>
        {loading && <p>טוען...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weatherData && (
          <div style={{ backgroundColor: "#fff",color: "#333", padding: "1rem", borderRadius: "8px", display: "inline-block" }}>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.main.temp}°C</p>
            <p>{weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}
