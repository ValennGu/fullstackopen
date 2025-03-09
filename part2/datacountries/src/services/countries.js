import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5'
const api_key = import.meta.env.VITE_OPEN_WEATHER

const getAll = () => (
  axios
    .get(`${baseUrl}/all`)
    .then(response => response.data)
)

const getByName = (name) => (
  axios
    .get(`${baseUrl}/name/${name}`)
    .then(response => response.data)
)

const getWeather = (lat, lon) => (
  axios
    .get(`${openWeatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    .then(response => response.data)
)

export default { getAll, getByName, getWeather }