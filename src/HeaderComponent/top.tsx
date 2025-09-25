
import { GoGear } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from "../assets/images/logo.svg";

function Top() {

    return(
        <>
            <div className="flex justify-between p-7 m-auto w-[90%]">
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='text-Neutral-0 flex gap-2 w-[120px] bg-Neutral-800 items-center justify-center border-none rounded-2xl cursor-pointer'>
                    <div><GoGear /></div>
                    <div>Units</div>
                    <div><RiArrowDropDownLine className="text-3xl font-DMSans font-light"/></div>
                </div>
            </div>
        </>
    )
}

export default Top;


