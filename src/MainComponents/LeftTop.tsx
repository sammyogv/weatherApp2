import { useWeather } from "../weatherContext";

import rainy from '../assets/images/icon-rain.webp'
import sunny from '../assets/images/icon-sunny.webp'
import snowy from '../assets/images/icon-snow.webp'
import stormy from '../assets/images/icon-storm.webp'
import foggy from '../assets/images/icon-fog.webp'
import partlyCloudy from '../assets/images/icon-partly-cloudy.webp'
import overcast from '../assets/images/icon-overcast.webp'
import drizzle from '../assets/images/icon-drizzle.webp'

interface ConditionIcon {
  name: string;
  url: string;
  codes: number[];
}

function LeftTop() {
  const { city, forecast, isLoading } = useWeather();

  const conditionIcons: ConditionIcon[] = [
    { name: "Sunny", url: sunny, codes: [0, 1] },
    { name: "PartlyCloudy", url: partlyCloudy, codes: [2] },
    { name: "Overcast", url: overcast, codes: [3] },
    { name: "Foggy", url: foggy, codes: [45, 48] },
    { name: "Drizzle", url: drizzle, codes: [51, 53, 55, 56, 57] },
    { name: "Rainy", url: rainy, codes: [61, 63, 65, 66, 67, 80, 81, 82] },
    { name: "Snowy", url: snowy, codes: [71, 73, 75, 77, 85, 86] },
    { name: "Stormy", url: stormy, codes: [95, 96, 99] }
  ];

  const today = forecast[0];

  const getWeatherIcon = (weatherCode: number): string => {
    const condition = conditionIcons.find(icon => 
      icon.codes.includes(weatherCode)
    );
    return condition ? condition.url : sunny;
  };

  const getWeatherCodeFromEmoji = (emoji: string): number => {
    const emojiToCode: Record<string, number> = {
      "☀️": 0,
      "🌤️": 1,
      "⛅": 2,
      "☁️": 3,
      "🌫️": 45,
      "🌦️": 51,
      "🌧️": 61,
      "❄️": 71,
      "🌨️": 77,
      "⛈️": 95,
    };
    return emojiToCode[emoji] || 0;
  };

  if (isLoading) {
    return (
      <div className="w-full bgimage h-32 sm:h-48 md:h-64 lg:h-72 rounded-lg sm:rounded-2xl flex justify-center items-center px-4">
        <p className="text-white text-base sm:text-lg md:text-xl">Loading weather...</p>
      </div>
    );
  }

  const currentTemp = today?.temp_max || 20;
  const weatherCode = today ? getWeatherCodeFromEmoji(today.icon) : 0;
  const weatherIcon = getWeatherIcon(weatherCode);

  const getCurrentDate = (): string => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <div className="sm:w-full xs:w-full bgimage h-32 sm:h-48 md:h-64 lg:h-72 rounded-lg sm:rounded-2xl flex flex-col sm:flex-row justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-16 items-center gap-4 sm:gap-8 md:gap-0">
      <div className="flex flex-col justify-start text-center sm:text-left">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-DMSans font-bold text-Neutral-0 leading-tight sm:leading-10">
          {city}
        </h1>
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-DMSans font-medium text-Neutral-0 leading-tight sm:leading-6 mt-1 sm:mt-2">
          {getCurrentDate()}
        </h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <img src={weatherIcon} alt="Weather" className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" />
        <h1 className="font-Bricolage font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic tracking-tighter text-Neutral-0 leading-none text-center">
          {Math.round(currentTemp)}°
        </h1>
      </div>
    </div>
  );
}

export default LeftTop;

