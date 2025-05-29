import { useEffect, useState } from 'react'

import CountriesService from './services/countries'
import CountriesList from './components/CountriesList'

function App() {
  const [countries, setCountries] = useState(null)
  const [singleCountry, setSingleCountry] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    CountriesService
      .getAll()
      .then(data => setCountries(data))
      .catch(() => console.log('Something went wrong.'))
  }, [])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
    setSingleCountry(null)
  }

  const onShowCountry = (countryName) => {
    CountriesService
      .getByName(countryName.toLowerCase())
      .then(data => setSingleCountry([data]))
      .catch(() => console.log('Something went wrong for a single country.'))
  }

  const filteredCountries = countries && !singleCountry
    ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    : singleCountry

  return (
    <>
      Find Countries: <input value={filter} onChange={onFilterChange} />
      <CountriesList countries={filteredCountries} onShow={onShowCountry} />
    </>
  )
}

export default App
