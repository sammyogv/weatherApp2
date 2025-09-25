import { useState } from "react"

import rainy from '../assets/images/icon-rain.webp'
import sunny from '../assets/images/icon-sunny.webp'
import snowy from '../assets/images/icon-snow.webp'
import stormy from '../assets/images/icon-storm.webp'
import foggy from '../assets/images/icon-fog.webp'
import partlyCloudy from '../assets/images/icon-partly-cloudy.webp'
import overcast from '../assets/images/icon-overcast.webp'
import drizzle from '../assets/images/icon-drizzle.webp'




function LeftTop (){

    interface ConditionIcon {
                 name: string;
                 url: string;
               }

    const [country, setCountry] = useState<string>("Berlin, Germany");
    const [temperature, setTemperature] = useState<number>(20);
    const conditionIcons: ConditionIcon[] = [
        { name: "Sunny", url: sunny },
        { name: "Rainy", url: rainy },
        { name: "Snowy", url: snowy },
        { name: "Stormy", url: stormy },
        { name: "Foggy", url: foggy },
        { name: "PartlyCloudy", url: partlyCloudy },
        { name: "Overcast", url: overcast },
        { name: "Drizzle", url: drizzle }
    ];

    return(
        <div
            className="w-full bgimage h-[286px] rounded-2xl flex justify-between px-[24px] py-[80] items-center">
            <div className="flex flex-col justify-start">
                <h1 className="text-[28px] font-DMSans font-bold text-Neutral-0 leading-[40px] text-center">{country}</h1>
                <h2 className="text-[18px] font-DMSans font-medium text-Neutral-0 leading-[24px] ">Current Location</h2>
            </div>
            <div className="flex items-center gap-[20px]">
                <img src={sunny} alt="Sunny" className="w-[120px] h-[120px]" />
                <h1 className="font-Bricolage font-SemiBold text-[96px] italic tracking-[-2px] text-Neutral-0 leading-1 text-center">{temperature}°</h1>
            </div>
           
        </div>
    )
}

export default LeftTop

