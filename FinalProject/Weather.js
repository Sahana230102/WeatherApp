import React, { useState } from "react";
import './Weather.css';
import axios from 'axios';

const API_KEY="9gOfcOtLecIiiEMVUSkDAyfTnqhi9qxj"
function Weather(){
    const[city,setCity]=useState('')
    const[weatherdata,setWeatherData]=useState(null)
    const[error,setError]=useState(null)

    let handleLocation=async ()=>{
        try{
            let response= await axios.get(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${API_KEY}`)
            console.log(response);
            setWeatherData(response)
        }
        catch(error){
            setError(true)

        }
    }
    return(
        <>
        <div className="container">
            <h1 className="title">Search Weather Condition</h1>
            <div className="inputContainer">
                <input type="text" placeholder="Enter the city name" className="input" value={city} 
                onChange={(e)=>setCity(e.target.value)}></input>
                <button className="button" onClick={handleLocation}>Search</button>
            </div>
            {error&&<p className="error">Failed to Fetch Data</p>}
            {weatherdata &&(
                <div className="weatherContainer">
                    <h2 className="subtitle">{weatherdata.data.location.name}</h2>
                    <p className="temperature">Temperature:{weatherdata.data.data.values.temperature}</p>
                    <p className="humidity">Humidity:{weatherdata.data.data.values.humidity}</p>
                    <p className="windspeed">WindSpeed:{weatherdata.data.data.values.windspeed}</p>

                </div>

            )}
        </div>
        </>
    )
}
export default Weather;