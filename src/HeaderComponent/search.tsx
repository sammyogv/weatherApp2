import { useState } from 'react';
import { useWeather } from '../weatherContext';
import { MdMic, MdMicNone } from 'react-icons/md';

import search from '../assets/images/icon-search.svg';

type SpeechRecognitionType = any;

function Search() {
    const { fetchWeather, isLoading } = useWeather();
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null);

    const initializeVoiceRecognition = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            alert("Voice search is not supported in your browser");
            return;
        }

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.language = "en-US";

        recognitionInstance.onstart = () => {
            setIsListening(true);
        };

        recognitionInstance.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            
            const city = transcript.trim();
            if (city) {
                setInputValue(city);
                fetchWeather(city);
            }
        };

        recognitionInstance.onerror = (event: any) => {
            console.error("Voice recognition error:", event.error);
            setIsListening(false);
        };

        recognitionInstance.onend = () => {
            setIsListening(false);
        };

        setRecognition(recognitionInstance);
        recognitionInstance.start();
    };

    const handleVoiceSearch = () => {
        if (isListening && recognition) {
            recognition.stop();
            setIsListening(false);
        } else {
            initializeVoiceRecognition();
        }
    };

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        if (inputValue.trim() === '') {
            alert('Please enter a city name');
            return;
        }

        await fetchWeather(inputValue);
        setInputValue('');
    }

    return (
        <>
            <form className="flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 text-Neutral-0 mt-6 sm:mt-8 md:mt-10 px-4 sm:px-0" onSubmit={handleSubmit}>
                <div className='flex gap-2 bg-Neutral-800 w-full sm:w-[526px] h-14 sm:h-14 items-center px-3 sm:px-4 rounded-lg sm:rounded-2xl'>
                    <img src={search} alt="search" className='h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0' />
                    <input 
                        type="text" 
                        placeholder='Search for a place....' 
                        className='rounded-full px-2 sm:px-4 py-2 border-none focus:outline-none text-xs sm:text-sm text-Neutral-0 bg-transparent flex-1 min-w-0'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                    />
                    {/* Voice Search Button */}
                    <button
                        type="button"
                        onClick={handleVoiceSearch}
                        className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors flex-shrink-0 ${
                            isListening
                                ? 'bg-Blue-500 text-white'
                                : 'bg-Neutral-700 text-Neutral-200 hover:bg-Neutral-600'
                        }`}
                        title={isListening ? "Stop listening" : "Voice search"}
                        disabled={isLoading}
                    >
                        {isListening ? <MdMic size={14} className="sm:hidden" /> : <MdMicNone size={14} className="sm:hidden" />}
                        {isListening ? <MdMic size={16} className="hidden sm:block" /> : <MdMicNone size={16} className="hidden sm:block" />}
                    </button>
                </div>
                <button 
                    type="submit"
                    className='bg-Blue-500 text-white text-center text-base sm:text-lg xs:text-xs xs:w-19 xs:px-0 md:text-2xl font-DMSans font-medium rounded-lg sm:rounded-2xl w-full sm:w-auto px-6 sm:px-auto h-14 sm:h-14 md:w-[114px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-Blue-600 transition-colors flex-shrink-0'
                    disabled={isLoading}
                >
                    {isLoading ? '...' : 'Search'}
                </button>
            </form>
        </>
    );
}

export default Search;

