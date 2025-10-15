import { useEffect, useState } from 'react';
import { useWeather, convertTemperature } from '../weatherContext';
import { fetchWeatherApi } from 'openmeteo';

import rainy from '../assets/images/icon-rain.webp';
import sunny from '../assets/images/icon-sunny.webp';
import snowy from '../assets/images/icon-snow.webp';
import stormy from '../assets/images/icon-storm.webp';
import foggy from '../assets/images/icon-fog.webp';
import partlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import overcast from '../assets/images/icon-overcast.webp';
import drizzle from '../assets/images/icon-drizzle.webp';

type HourlyDataType = {
    time: Date[];
    temperature: Float32Array;
    weathercode: Float32Array;
};

interface ConditionIcon {
  name: string;
  url: string;
  codes: number[];
}

function Right() {
    const { latitude, longitude, units } = useWeather();
    const [hourlyData, setHourlyData] = useState<HourlyDataType | null>(null);
    const [selectedDay, setSelectedDay] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const conditionIcons: ConditionIcon[] = [
        { name: "Sunny", url: sunny, codes: [0] },
        { name: "PartlyCloudy", url: partlyCloudy, codes: [1, 2] },
        { name: "Overcast", url: overcast, codes: [3] },
        { name: "Foggy", url: foggy, codes: [45, 48] },
        { name: "Drizzle", url: drizzle, codes: [51, 53, 55] },
        { name: "Rainy", url: rainy, codes: [56, 57, 61, 63, 65, 66, 67, 80, 81, 82] },
        { name: "Snowy", url: snowy, codes: [71, 73, 75, 77, 85, 86] },
        { name: "Stormy", url: stormy, codes: [95, 96, 99] }
    ];

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchHourlyData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const params = {
                    latitude: latitude,
                    longitude: longitude,
                    hourly: ['temperature_2m', 'weathercode'],
                    forecast_days: 7
                };

                const url = "https://api.open-meteo.com/v1/forecast";
                const responses = await fetchWeatherApi(url, params);
                
                const response = responses[0];
                const utcOffsetSeconds = response.utcOffsetSeconds();
                const hourly = response.hourly()!;

                const hourlyData: HourlyDataType = {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    temperature: hourly.variables(0)!.valuesArray()!,
                    weathercode: hourly.variables(1)!.valuesArray()!,
                };

                setHourlyData(hourlyData);
            } catch (err) {
                console.error('Error fetching hourly data:', err);
                setError('Failed to fetch hourly data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHourlyData();
    }, [latitude, longitude]);

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const getWeatherIcon = (code: number): string => {
        const condition = conditionIcons.find(icon => 
            icon.codes.includes(Math.round(code))
        );
        return condition ? condition.url : partlyCloudy;
    };

    const getTempUnit = () => {
        return units.temperature === "Celsius (°C)" ? "°C" : "°F";
    };

    const getDayName = (dayOffset: number): string => {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        
        if (dayOffset === 0) return 'Today';
        if (dayOffset === 1) return 'Tomorrow';
        
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const getDayDate = (dayOffset: number): string => {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getHoursForDay = (dayOffset: number) => {
        if (!hourlyData) return [];

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + dayOffset);
        targetDate.setHours(0, 0, 0, 0);

        const startIndex = hourlyData.time.findIndex(time => {
            const timeDate = new Date(time);
            timeDate.setHours(0, 0, 0, 0);
            return timeDate.getTime() === targetDate.getTime();
        });

        if (startIndex === -1) return [];

        if (dayOffset === 0) {
            const now = new Date();
            const currentHourIndex = hourlyData.time.findIndex(time => 
                time.getHours() === now.getHours() && 
                time.getDate() === now.getDate()
            );
            return hourlyData.time.slice(currentHourIndex, currentHourIndex + 8);
        }

        const sixAMIndex = startIndex + 6;
        return hourlyData.time.slice(sixAMIndex, sixAMIndex + 8);
    };

    const handleDaySelect = (dayOffset: number) => {
        setSelectedDay(dayOffset);
        setIsDropdownOpen(false);
    };

    if (isLoading) {
        return (
            <div className="bg-Neutral-800 rounded-2xl p-6 w-full max-w-[384px]">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-Neutral-800 rounded-2xl p-6 w-full max-w-[384px]">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!hourlyData) {
        return (
            <div className="bg-Neutral-800 rounded-2xl p-6 w-full max-w-[384px]">
                <div className="text-white">No data available</div>
            </div>
        );
    }

    const hoursToDisplay = getHoursForDay(selectedDay);

    return (
        <div className="bg-Neutral-800 rounded-2xl p-6 w-full sm:max-w-[500px] md:max-w-[650px] lg:max-w-[384px]  h-fit relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white font-DMSans font-semibold text-[20px]">
                    Hourly forecast
                </h2>
                <div className="relative">
                    <button 
                        className="text-Neutral-0 text-sm bg-Neutral-600 px-3 py-1.5 rounded-lg flex items-center gap-2"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {getDayName(selectedDay)}
                        <svg 
                            width="12" 
                            height="12" 
                            viewBox="0 0 12 12" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 bg-Neutral-700 rounded-lg shadow-lg z-10 min-w-[180px] border border-Neutral-600">
                            {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => (
                                <button
                                    key={dayOffset}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-Neutral-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                                        selectedDay === dayOffset ? 'bg-Neutral-600 text-white' : 'text-Neutral-200'
                                    }`}
                                    onClick={() => handleDaySelect(dayOffset)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-DMSans">{getDayName(dayOffset)}</span>
                                        <span className="text-xs text-Neutral-300">{getDayDate(dayOffset)}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Hourly List */}
            <div className="space-y-3">
                {hoursToDisplay.length > 0 ? (
                    hoursToDisplay.map((time, index) => {
                        const actualIndex = hourlyData.time.findIndex(t => t.getTime() === time.getTime());
                        const celsiusTemp = hourlyData.temperature[actualIndex];
                        const convertedTemp = Math.round(convertTemperature(celsiusTemp, units.temperature));
                        const weatherCode = Math.round(hourlyData.weathercode[actualIndex]);
                        const icon = getWeatherIcon(weatherCode);

                        return (
                            <div 
                                key={index} 
                                className="flex justify-between items-center bg-Neutral-700 px-2 py-2 border-1 rounded-xl border-Neutral-600"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={icon} alt="weather" className="w-10 h-10" />
                                    <span className="text-white font-DMSans text-[16px]">
                                        {time.toLocaleTimeString('en-US', { 
                                            hour: 'numeric', 
                                            hour12: true 
                                        })}
                                    </span>
                                </div>
                                <span className="text-white font-DMSans text-[18px] font-medium">
                                    {convertedTemp}{getTempUnit()}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-white text-center py-4">No data available for this day</div>
                )}
            </div>
        </div>
    );
}

export default Right;

