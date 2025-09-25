

import search from '../assets/images/icon-search.svg'

function Search(){

    return(
        <>
            <form className="flex items-center gap-4 text-Neutral-0 mt-10">
                <div className='flex gap-2 bg-Neutral-800 w-[526px] h-[56px] items-center px-4 rounded-2xl'>
                    <img src={search} alt="" className='h-6 w-6' />
                    <input type="text" placeholder='Search for a place....' className='rounded-full px-4 py-2 border-none focus:outline-none text-Neutral-0'/>
                    
                </div>
                <div >
                    <button className='bg-Blue-500 text-white text-[28px] font-DMSans font-medium rounded-2xl px-auto w-[114px] h-[56px]'>Search</button>
                </div>
            </form>
        </>
    )
}

export default Search

