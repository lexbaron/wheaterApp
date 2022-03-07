import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = () => {

    const[weather, setWeather] = useState({})

    const success = (pos)=>{
        let latitude = pos.coords.latitude
        let longitude = pos.coords.longitude

        axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b73597295a330aec76ce6845408772f9`)
    .then(res => {setWeather(res.data)
    console.log(res.data)})


    }

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(success)

    }, [])

    

    

    

    return (
        <div className='weatherCard'>
            <h1>WEATHER APP</h1>
            <h4>{weather.name}, {weather.sys?.country}</h4>
            <img src= {`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <p>{weather.main?.temp}°C</p>
            <ul>
                <li><b>wind speed:</b> {weather.wind?.speed}m/s</li>
                
            </ul>
            
        </div>
    );
};

export default Weather;