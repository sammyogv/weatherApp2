import { useState } from "react";


function LeftMiddle() {

    const [temperature, setTemperature] = useState<number | null>(18);
    const [humidity, setHumidity] = useState<number | null>(46);
    const [windSpeed, setWindSpeed] = useState<number | null>(14);
    const [precipitation, setPrecipitation] = useState<number | null>(0);
    

    return(
        <>
        <div className="mt-[32px] flex w-full mb-[48px] justiry-space-between gap-[24px]">
            <div className="flex flex-col items-start justify-start p-6 w-[182px] h-[118px] text-Neutral-0 bg-Neutral-800 border-1 gap-[24px] border-Neutral-600 rounded-2xl">
                <div className="font-DMSans text-[16px] font-medium leading-1.2 tracking-0 text-Neutral-200">Feels Like</div>
                <div className="font-DMSans font-light text-[32px] leading-1 justify-start tracking-0">{temperature !== null ? `${temperature}°C` : "N/A"}</div>
            </div>
            <div className="flex flex-col items-start justify-start p-6 w-[182px] h-[118px] text-Neutral-0 bg-Neutral-800 border-1 gap-[24px] border-Neutral-600 rounded-2xl">
                <div className="font-DMSans text-[16px] font-medium leading-1.2 tracking-0 text-Neutral-200">Humidity</div>
                <div className="font-DMSans font-light text-[32px] leading-1 justify-start tracking-0">{humidity !== null ? `${humidity}°C` : "N/A"}</div>
            </div>
            <div className="flex flex-col items-start justify-start p-6 w-[182px] h-[118px] text-Neutral-0 bg-Neutral-800 border-1 gap-[24px] border-Neutral-600 rounded-2xl">
                <div className="font-DMSans text-[16px] font-medium leading-1.2 tracking-0 text-Neutral-200">Wind</div>
                <div className="font-DMSans font-light text-[32px] leading-1 justify-start tracking-0">{windSpeed !== null ? `${windSpeed} km/h` : "N/A"}</div>
            </div>
            <div className="flex flex-col items-start justify-start p-6 w-[182px] h-[118px] text-Neutral-0 bg-Neutral-800 border-1 gap-[24px] border-Neutral-600 rounded-2xl">
                <div className="font-DMSans text-[16px] font-medium leading-1.2 tracking-0 text-Neutral-200">Precipitation</div>
                <div className="font-DMSans font-light text-[32px] leading-1 justify-start tracking-0">{precipitation !== null ? `${precipitation} mm` : "N/A"}</div>
            </div>
        </div>
        </>
    );
}

export default LeftMiddle;


