import { useState } from "react";
import { GoGear } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useWeather, convertTemperature, convertWindSpeed, convertPrecipitation, type TemperatureUnit, type WindSpeedUnit, type PrecipitationUnit } from "../weatherContext";
import logo from "../assets/images/logo.svg";

function Top() {
    const {units, setUnits} = useWeather();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"temperature" | "wind" | "precipitation">("temperature");

    const temperatureOptions: TemperatureUnit[] = ["Celsius (°C)", "Fahrenheit (°F)"];
    const windSpeedOptions: WindSpeedUnit[] = ["km/h", "mph"];
    const precipitationOptions: PrecipitationUnit[] = ["Millimeters (mm)", "Inches (in)"];

    const handleTemperatureChange = (option: TemperatureUnit) => {
        setUnits({ ...units, temperature: option });
    };

    const handleWindSpeedChange = (option: WindSpeedUnit) => {
        setUnits({ ...units, windSpeed: option });
    };

    const handlePrecipitationChange = (option: PrecipitationUnit) => {
        setUnits({ ...units, precipitation: option });
    };

    return (
        <>
            <div className="flex justify-between items-center px-4 py-4 sm:px-6 md:px-7 m-auto w-full">
                <div className="flex-shrink-0">
                    <img src={logo} alt="Logo" className="h-8 sm:h-10 md:h-auto" />
                </div>

                {/* Units Button with Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-Neutral-0 flex gap-1 sm:gap-2 w-auto sm:w-[120px] px-3 sm:px-auto py-2 bg-Neutral-800 items-center justify-center border-none rounded-xl sm:rounded-2xl cursor-pointer hover:bg-Neutral-700 transition-colors text-xs sm:text-sm md:text-base'
                    >
                        <div className="hidden sm:block"><GoGear /></div>
                        <div className="hidden xs:inline">Units</div>
                        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <RiArrowDropDownLine className="text-2xl sm:text-3xl font-DMSans font-light" />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-Neutral-800 rounded-lg sm:rounded-2xl shadow-lg z-50 w-[95vw] sm:w-[420px] border border-Neutral-600 p-3 sm:p-4 max-h-[80vh] overflow-y-auto">
                            {/* Tabs */}
                            <div className="flex gap-1 sm:gap-2 mb-4 border-b border-Neutral-600 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab("temperature")}
                                    className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-DMSans transition-colors whitespace-nowrap ${
                                        activeTab === "temperature"
                                            ? "text-Blue-500 border-b-2 border-Blue-500"
                                            : "text-Neutral-400 hover:text-Neutral-200"
                                    }`}
                                >
                                    Temperature
                                </button>
                                <button
                                    onClick={() => setActiveTab("wind")}
                                    className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-DMSans transition-colors whitespace-nowrap ${
                                        activeTab === "wind"
                                            ? "text-Blue-500 border-b-2 border-Blue-500"
                                            : "text-Neutral-400 hover:text-Neutral-200"
                                    }`}
                                >
                                    Wind Speed
                                </button>
                                <button
                                    onClick={() => setActiveTab("precipitation")}
                                    className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-DMSans transition-colors whitespace-nowrap ${
                                        activeTab === "precipitation"
                                            ? "text-Blue-500 border-b-2 border-Blue-500"
                                            : "text-Neutral-400 hover:text-Neutral-200"
                                    }`}
                                >
                                    Precipitation
                                </button>
                            </div>

                            {/* Temperature Options */}
                            {activeTab === "temperature" && (
                                <div className="space-y-3">
                                    {temperatureOptions.map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="temperature"
                                                checked={units.temperature === option}
                                                onChange={() => handleTemperatureChange(option)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span className="ml-3 text-Neutral-200 text-xs sm:text-sm group-hover:text-white transition-colors font-DMSans">
                                                {option}
                                            </span>
                                            {units.temperature === option && (
                                                <span className="ml-auto text-Blue-500">✓</span>
                                            )}
                                        </label>
                                    ))}
                                    <div className="mt-4 pt-4 border-t border-Neutral-600">
                                        <p className="text-xs text-Neutral-400">
                                            Example: 20°C = {Math.round(convertTemperature(20, units.temperature) * 10) / 10}°{units.temperature === "Celsius (°C)" ? "C" : "F"}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Wind Speed Options */}
                            {activeTab === "wind" && (
                                <div className="space-y-3">
                                    {windSpeedOptions.map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="windSpeed"
                                                checked={units.windSpeed === option}
                                                onChange={() => handleWindSpeedChange(option)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span className="ml-3 text-Neutral-200 text-xs sm:text-sm group-hover:text-white transition-colors font-DMSans">
                                                {option}
                                            </span>
                                            {units.windSpeed === option && (
                                                <span className="ml-auto text-Blue-500">✓</span>
                                            )}
                                        </label>
                                    ))}
                                    <div className="mt-4 pt-4 border-t border-Neutral-600">
                                        <p className="text-xs text-Neutral-400">
                                            Example: 20 km/h = {Math.round(convertWindSpeed(20, units.windSpeed) * 10) / 10} {units.windSpeed}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Precipitation Options */}
                            {activeTab === "precipitation" && (
                                <div className="space-y-3">
                                    {precipitationOptions.map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="precipitation"
                                                checked={units.precipitation === option}
                                                onChange={() => handlePrecipitationChange(option)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <span className="ml-3 text-Neutral-200 text-xs sm:text-sm group-hover:text-white transition-colors font-DMSans">
                                                {option}
                                            </span>
                                            {units.precipitation === option && (
                                                <span className="ml-auto text-Blue-500">✓</span>
                                            )}
                                        </label>
                                    ))}
                                    <div className="mt-4 pt-4 border-t border-Neutral-600">
                                        <p className="text-xs text-Neutral-400">
                                            Example: 10 mm = {Math.round(convertPrecipitation(10, units.precipitation) * 100) / 100} {units.precipitation}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default Top;

