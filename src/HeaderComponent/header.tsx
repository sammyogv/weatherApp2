
import Greetings from './greetings.tsx';
import Search from './search.tsx';
import Top from './top.tsx'


function Header(){

    return(
        <div className='w-screen flex flex-col items-center'>
            <Top/>
            <Greetings/>
            <Search/>
        </div>
    )
}

export default Header;

