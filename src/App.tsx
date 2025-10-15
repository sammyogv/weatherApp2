
import './App.css'
import Header from './HeaderComponent/header'
import Main from './MainComponents/Main'
import { WeatherProvider } from './weatherContext'


function App() {
  return (
    <>
    <WeatherProvider>
      <Header/>
      <Main/>
    </WeatherProvider>
    </>
  )
}


export default App
