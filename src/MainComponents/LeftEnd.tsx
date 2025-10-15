import { useWeather, convertTemperature } from "../weatherContext";

function DailyForecast() {
  const { forecast, units, isLoading, error } = useWeather();

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const getTempUnit = () => {
    return units.temperature === "Celsius (°C)" ? "°C" : "°F";
  };

  return (
    <div className="p-0 flex w-full flex-col">
      {forecast.length > 0 && (
        <>
          <h2 className="text-Neutral-0 font-DMSans font-semibold text-[20px] mb-2">
            Daily forecast
          </h2>
          <div className="flex space-x-3 xs:grid sm:gap-1 xs:gap-4 xs:grid-cols-2 sm:flex flex-wrap sm:flex-row sm:flex-1 place-items-center overflow-x-auto scrollbar-hide w-full sm:justify-self-auto lg:justify-between h-full">
            {forecast.map((day, index) => {
              const convertedMaxTemp = Math.round(convertTemperature(day.temp_max, units.temperature));
              const convertedMinTemp = Math.round(convertTemperature(day.temp_min, units.temperature));

              return (
                <div
                  key={index}
                  className="bg-[#1d1d35] rounded-2xl p-4 xs:w-[140px] sm:w-26 flex flex-col items-center"
                >
                  <span className="text-white text-sm">{day.day}</span>
                  <div className="text-2xl my-2">{day.icon}</div>
                  <div className="flex justify-between gap-3 items-center text-sm text-gray-300">
                    <span>{convertedMaxTemp}{getTempUnit()}</span>
                    <span className="text-gray-400">{convertedMinTemp}{getTempUnit()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default DailyForecast;

