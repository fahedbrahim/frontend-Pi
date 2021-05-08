import { useEffect, useState } from 'react';
import MapQuest from './MapQuest';
import axios from 'axios';
import {FetchWeather} from './weather/FetchWeather'



function Circuit(props) {

var weatherLocate = localStorage.getItem("weatherInfo") ? localStorage.getItem("weatherInfo") : localStorage.setItem("weatherInfo", "Tunis")
var time = new Date().toLocaleTimeString()
const [start, setStart]= useState('')
const [destinations, setDestinations]= useState([]);
const [query, setQuery]=useState('')
const [weather, setWeather]=useState({})
const [ctime, setCtime]= useState(time)
const [charger, setCharger]=useState(false)

const UpdateTime=()=>{
  var time = new Date().toLocaleTimeString()
  setCtime(time)
}

setInterval(UpdateTime, 1000)

useEffect(async ()=>{
  const res = await axios.get(`/geo/${props.match.params.id}`,{ withCredentials: true })
    setStart(res.data.start)
    setDestinations(res.data.waypoints)
    setCharger(true)
    
    console.log(start)
    console.log(destinations)
  
},[])

useEffect(async()=>{
  const data = await FetchWeather(weatherLocate)
  setWeather(data)
},[FetchWeather])

const search = async(e)=>{
  if(e.key == "Enter"){
  const data = await FetchWeather(query)
  setWeather(data)
  setQuery('')
  localStorage.setItem("weatherInfo", query)
  }
} 
  return (
    <>
        <div className="row col-lg-4 my-3 px-3" style={{background:"rgba(250, 250, 250, 0.85)", boxShadow:"5px 5px 15px rgba(0, 0, 0, 0.5)"}}>
      
      <input type="text" className="form-control my-3 col-3 " placeholder="Country..." value={query} onChange={(e)=>setQuery(e.target.value)} onKeyPress={search} />&ensp;
      {weather.main && (
      
        <div className="my-3 " style={{fontSize:"20px", display:"flex", flexWrap:"nowrap"}}>
          <strong>
            {weather.name} </strong><span style={{fontSize:"10px"}}>{weather.sys.country}</span>&ensp;
            <strong>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </strong>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} style={{height:"50px", width:"50px"}} />
        </div>
      
      )}
      
      </div>

      <div className="row col-lg-4 my-3 px-3" style={{justifyContent:'center',background:"rgba(250, 250, 250, 0.85)", boxShadow:"5px 5px 15px rgba(0, 0, 0, 0.5)"}}>
        <div className="my-3 " style={{fontSize:"25px"}}>
          {ctime}
        </div>
      </div>

    <div className="App">
      <div className="App-header">  
      </div>
      <div style={{marginTop: "30px", marginBottom:"150px", boxShadow : "12px 12px 22px grey", height:'600px'}}>
        {start !== '' && destinations.length !== 0 ?
      <MapQuest
        height={`${window.innerHeight * 0.89}px`}
        width={'100%'}
        center={[40.015831, -105.27927]}
        baseLayer={'light'}
        zoom={10}
        pitch={60}
        bearing={0}
        apiKey={'UwYfiIYH4iLLIAGTJVTgZOuOd7Ndn61H'}
        departure = {start}
        dests = {destinations}
      />:<></>}
      </div>
    </div>
    </>
  );
}

export default Circuit;
