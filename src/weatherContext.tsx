import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type DailyForecastType = {
  day: string;
  temp_max: number;
  temp_min: number;
  icon: string;
};

type InfoDetailsType = {
    humidity:number;
    windSpeed:number;
    precipitation:number;
}

type TemperatureUnit = "Celsius (°C)" | "Fahrenheit (°F)";
type WindSpeedUnit = "km/h" | "mph";
type PrecipitationUnit = "Millimeters (mm)" | "Inches (in)";

type Units = {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
};

type WeatherContextType = {
  city: string;
  forecast: DailyForecastType[];
  infodetails: InfoDetailsType[];
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
  setCity: (city: string) => void;
  fetchWeather: (cityName?: string) => Promise<void>;
  units: Units;
  setUnits: (units: Units) => void;
};

const weatherIcons: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌦️",
  56: "🌧️",
  57: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  66: "🌧️",
  67: "🌧️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  77: "🌨️",
  80: "🌦️",
  81: "🌦️",
  82: "🌦️",
  85: "🌨️",
  86: "🌨️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

const DEFAULT_UNITS: Units = {
  temperature: "Celsius (°C)",
  windSpeed: "km/h",
  precipitation: "Millimeters (mm)",
};

// Conversion helper functions
export const convertTemperature = (celsius: number, unit: TemperatureUnit): number => {
  if (unit === "Fahrenheit (°F)") {
    return (celsius * 9/5) + 32;
  }
  return celsius;
};

export const convertWindSpeed = (kmh: number, unit: WindSpeedUnit): number => {
  if (unit === "mph") {
    return kmh * 0.621371;
  }
  return kmh;
};

export const convertPrecipitation = (mm: number, unit: PrecipitationUnit): number => {
  if (unit === "Inches (in)") {
    return mm * 0.0393701;
  }
  return mm;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>("Berlin");
  const [forecast, setForecast] = useState<DailyForecastType[]>([]);
  const [infodetails, setInfodetails] = useState<InfoDetailsType[]>([]);
  const [units, setUnits] = useState<Units>(DEFAULT_UNITS);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName?: string) => {
    const targetCity = cityName || city;
    setIsLoading(true);
    setError(null);

    try {
      // 1. Get city coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${targetCity}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found");
        setIsLoading(false);
        return;
      }

      const { latitude: lat, longitude: lon } = geoData.results[0];
      setLatitude(lat);
      setLongitude(lon);

      // 2. Fetch weather forecast
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,precipitation_sum,wind_gusts_10m_max,precipitation_probability_mean,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      console.log(weatherData);
      

      const daily: DailyForecastType[] = weatherData.daily.time.map(
        (date: string, index: number) => ({
          day: new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp_max: weatherData.daily.temperature_2m_max[index],
          temp_min: weatherData.daily.temperature_2m_min[index],
          icon:
            weatherIcons[weatherData.daily.weathercode[index] as number] || "❓",
        })
      );

      const info: InfoDetailsType[] = weatherData.daily.time.map(
        (_date: string, index: number) => ({
          humidity: weatherData.daily.precipitation_probability_mean[index],
          windSpeed: weatherData.daily.wind_gusts_10m_max[index],
          precipitation: weatherData.daily.precipitation_sum[index],
        })
      );

      console.log(weatherData);

      setForecast(daily);
      setInfodetails(info);
      if (cityName) setCity(cityName);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        forecast,
        infodetails,
        latitude,
        longitude,
        isLoading,
        error,
        setCity,
        fetchWeather,
        units,
        setUnits,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export type { TemperatureUnit, WindSpeedUnit, PrecipitationUnit, Units };

