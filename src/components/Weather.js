import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = () => {

    const[weather, setWeather] = useState({})
    const[temp, setTemp] = useState(0)
    const[isCent, setIsCent] = useState(true)

    const success = (pos)=>{
        let latitude = pos.coords.latitude
        let longitude = pos.coords.longitude

        axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b73597295a330aec76ce6845408772f9`)
    .then(res => {setWeather(res.data)
                setTemp(Math.round((res.data?.main.temp) - 273.15))
                
                console.log(res.data)})
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    }, [])

    const convertTemp = () => {
        if(isCent){
            setTemp(Math.round((temp * 9/5) + 32))
            
            setIsCent(false)
        }else{
            setTemp(Math.round((temp - 32) * 5/9))
            
            setIsCent(true)
        }
    }

    return (
        <div className='weatherCard'>
            <div className='tittle'>
                <h1>WEATHER APP</h1>
                <h4>{weather.name}, {weather.sys?.country}</h4>
            </div>
            <div>
                <img className='img' src={weather.weather?.[0].icon !== undefined ?`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png` : console.log("not yet") } alt="ups" />
                <p>{temp} {isCent ? "°C" : "°F"}  </p>
            </div>
            <div>
                <ul>
                    <li><b>wind speed:</b> {weather.wind?.speed}m/s</li>
                    
                </ul>
            </div>
            <button onClick={convertTemp}> <b>change to: </b> {isCent ? "Farenheit" : "Celsius"} </button>      
        </div>
    );
};

export default Weather;