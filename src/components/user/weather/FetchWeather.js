import axios from 'axios'

const URL = process.env.URL_WEATHER
const API_Key = process.env.KEY_WEATHER

export const FetchWeather = async (query) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=1b308fed40df587ac0e7658276b340c4`)
    return data
}