import { useState, useEffect } from "react"

import CountriesService from '../services/countries'

const Country = ({country}) => {
  const [windSpeed, setWindSpeed] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [weatherIcon, setWeatherIcon] = useState(null)

  useEffect(() => {
    CountriesService
    .getWeather(country.latlng[0], country.latlng[1])
    .then(data => {
      setWindSpeed(data.wind.speed)
      setTemperature(data.main.temp)
      setWeatherIcon(data.weather[0].icon)
    })
  }, [country])
  
  const languages = Object.values(country.languages)

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.png} />
      <h3>Weather in {country.capital[0]}</h3>
      {weatherIcon && <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" />}
      <p>Temperature {temperature} Far</p>
      <p>Wind {windSpeed} m/s</p>
    </>
  )
}

export default Country