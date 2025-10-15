import { useWeather, convertTemperature, convertWindSpeed, convertPrecipitation } from "../weatherContext";

function LeftMiddle() {
    const { forecast, infodetails, units, isLoading, error } = useWeather();

    if (isLoading) {
      return <div className="text-white text-sm md:text-base">Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-sm md:text-base">{error}</div>;
    }

    const getTempUnit = () => {
      return units.temperature === "Celsius (°C)" ? "°C" : "°F";
    };

    const getWindUnit = () => {
      return units.windSpeed;
    };

    const getPrecipUnit = () => {
      return units.precipitation === "Millimeters (mm)" ? "mm" : "in";
    };

    return(
        <section className="w-full xs:w-[90%]  px-4 sm:px-6 md:px-0">
            {infodetails.length > 0 && forecast.length > 0 && 
            <>
                <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 mb-8 sm:mb-12 md:mb-16 lg:mb-24 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {/* Feels Like Card */}
                    <div className="flex flex-col items-start justify-start p-3 sm:p-4 md:p-6 text-Neutral-0 bg-Neutral-800 border-1 gap-3 sm:gap-4 md:gap-6 border-Neutral-600 rounded-lg sm:rounded-xl md:rounded-2xl min-h-24 sm:min-h-28 md:min-h-32">
                        <div className="font-DMSans text-xs sm:text-sm md:text-base font-medium leading-tight text-Neutral-200">Feels Like</div>
                        <div className="font-DMSans font-light text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-none">
                          {forecast[0]?.temp_max !== undefined && forecast[0]?.temp_max !== null 
                            ? `${Math.round(convertTemperature(forecast[0].temp_max, units.temperature))}${getTempUnit()}`
                            : "N/A"
                          }
                        </div>
                    </div>

                    {/* Humidity Card */}
                    <div className="flex flex-col items-start justify-start p-3 sm:p-4 md:p-6 text-Neutral-0 bg-Neutral-800 border-1 gap-3 sm:gap-4 md:gap-6 border-Neutral-600 rounded-lg sm:rounded-xl md:rounded-2xl min-h-24 sm:min-h-28 md:min-h-32">
                        <div className="font-DMSans text-xs sm:text-sm md:text-base font-medium leading-tight text-Neutral-200">Humidity</div>
                        <div className="font-DMSans font-light text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-none">
                          {infodetails[0].humidity !== null ? `${Math.round(infodetails[0].humidity)}%` : "N/A"}
                        </div>
                    </div>

                    {/* Wind Card */}
                    <div className="flex flex-col items-start justify-start p-3 sm:p-4 md:p-6 text-Neutral-0 bg-Neutral-800 border-1 gap-3 sm:gap-4 md:gap-6 border-Neutral-600 rounded-lg sm:rounded-xl md:rounded-2xl min-h-24 sm:min-h-28 md:min-h-32">
                        <div className="font-DMSans text-xs sm:text-sm md:text-base font-medium leading-tight text-Neutral-200">Wind</div>
                        <div className="font-DMSans font-light text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-none">
                          {infodetails[0].windSpeed != null 
                            ? `${Math.round(convertWindSpeed(infodetails[0].windSpeed, units.windSpeed))} ${getWindUnit()}`
                            : "N/A"
                          }
                        </div>
                    </div>

                    {/* Precipitation Card */}
                    <div className="flex flex-col items-start justify-start p-3 sm:p-4 md:p-6 text-Neutral-0 bg-Neutral-800 border-1 gap-3 sm:gap-4 md:gap-6 border-Neutral-600 rounded-lg sm:rounded-xl md:rounded-2xl min-h-24 sm:min-h-28 md:min-h-32">
                        <div className="font-DMSans text-xs sm:text-sm md:text-base font-medium leading-tight text-Neutral-200">Precipitation</div>
                        <div className="font-DMSans font-light text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-none">
                          {infodetails[0].precipitation !== null 
                            ? `${Math.round(convertPrecipitation(infodetails[0].precipitation, units.precipitation) * 10) / 10} ${getPrecipUnit()}`
                            : "N/A"
                          }
                        </div>
                    </div>
                </div>
            </>}
        </section>
    );
}

export default LeftMiddle;
