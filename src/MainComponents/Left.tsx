import DailyForecast from "./LeftEnd";
import LeftMiddle from "./LeftMiddle";
import LeftTop from "./LeftTop";


function Left() {

    return(
        <div className="w-full p-0 justify-center">
            <LeftTop/>
            <LeftMiddle/>
            <DailyForecast/>
        </div>
    )
}

export default Left;
