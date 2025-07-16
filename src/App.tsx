import { useEffect, useReducer, useState } from 'react'

import axios from 'axios'


import fetchWeatherToday from './api/WeatherTodayApi';
import { TiWeatherCloudy } from "react-icons/ti";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiTempHigh } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { LuWind } from "react-icons/lu";



function App() {
  

  const [loading,setLoading] = useState<boolean>(false)
  const [location,setLocation] = useState<string>("Hanoi");
  const [searchLocation,setSearchLocaion] = useState<string>("")
  const [weatherData,setWeatherData] = useState<any>(null);
  const [detailLocation,setDetailLocation] = useState<any>(null)
  const [currentWeatherData,setCurrentWeatherData] = useState<any>(null);




  //fetch Weather today with location 
  useEffect(() => {


    const fetchData = async () => {
      try {
          setCurrentWeatherData(null)
          const data = await fetchWeatherToday(location);
          setWeatherData(data.forecast.forecastday);
          setCurrentWeatherData(data.current)
          setDetailLocation(data.location)
        } catch (error) {
          console.error("Fetch weather error:", error);
        }
        finally{
          setLoading(true)
          setLoading(false)
        }
      };
  
      fetchData();

      
  },[location])


  return (
    <> 

    <div className='flex flex-col justify-center items-center'>

        {/* Div display current  */}

        <div className="relative w-full h-screen rounded-lg p-6 text-white
                flex flex-col items-center
                overflow-hidden
                before:content-[''] 
                before:absolute before:inset-0
                before:bg-[url('https://images.unsplash.com/photo-1473116763249-2faaef81ccda')] 
                before:bg-cover before:bg-center 
                before:opacity-80
                before:z-0 
                bg-black">
          
          <p className='z-10 font-bold text-2xl'>ADAMO - WEATHER DATA</p>
          {/* Input field search location */}
          <div className='flex justify-center mt-5 w-full gap-3 z-10'>
              <input type="text" className='rounded-md w-100 h-10 border-2 border-white p-2 text-white placeholder-white focus:outline-none focus:ring-0 focus:border-white bg-transparent' placeholder='Search by name, zipcode.....' value={searchLocation} onChange={(e) => setSearchLocaion(e.target.value)} />
              <button onClick={() => {setLocation(searchLocation); setSearchLocaion("")}} className='p-1 bg-transparent text-white border-2 rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>Search</button>
          </div>

          <div className='bg-white w-250 h-0.5 z-10 mt-10 mb-5'></div>
          <p className='z-10 font-bold text-lg'>Today</p>
          {/* Display current weather tod */}
          <div className='z-10 flex w-250 h-50 rounded-lg items-center justify-between mb-5'>
              {/* Display status*/}

              {loading && (
                <>  
                  <p className='w-full items-center flex justify-center'>Loading...</p>
                </>
              )}

              {currentWeatherData && (
                <>
                    <TiWeatherCloudy className='w-40 h-40'></TiWeatherCloudy>
                    <div className='flex flex-col items-center justify-center'>
                        <CiLocationArrow1 className='w-10 h-10 text-white mb-2'></CiLocationArrow1>
                        <p className='font-semibold text-2xl'>{detailLocation.name}</p>
                        <p className=''>{detailLocation.country}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <CiTempHigh className='w-10 h-10 text-white mb-2'></CiTempHigh>
                        <p className='font-semibold text-2xl'>{currentWeatherData.temp_c} °C</p>
                        <p className=''>Temperature</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <IoWaterOutline className='w-10 h-10 text-white mb-2'></IoWaterOutline>
                        <p className='font-semibold text-2xl'>{currentWeatherData.humidity} %</p>
                        <p className=''>Humidity</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <LuWind className='w-10 h-10 text-white mb-2'></LuWind>
                        <p className='font-semibold text-2xl'>{currentWeatherData.vis_km} km/h</p>
                        <p className=''>Wind speed</p>
                    </div>
                </>
              )}
          </div>

          <div className='bg-white w-250 h-0.5 z-10 mt-10 mb-5'></div>
          

          <p className='z-10 font-bold text-lg'>7 Days Forecast</p>
          <div className='z-10 flex w-250 h-50 rounded-lg items-center justify-between p-2'>
              
              {weatherData && weatherData.map((weather: any) => (
                <div className='bg-transparent flex flex-col justify-center items-center gap-2 border-1 rounded-lg p-2 backdrop-blur-xs'>
                  <p className='font-semibold'>{weather.date.split("-").reverse().join("/")}</p>
                  <TiWeatherCloudy className='w-10 h-10 text-white'></TiWeatherCloudy>
                  <p>{weather.day.maxtemp_c}°C</p>
                </div>

              ))}
              
          </div>

        </div>
    </div>
    
    
     
    </>
  )
}

export default App
