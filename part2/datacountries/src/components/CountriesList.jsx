import Country from "./Country"

const CountryListItem = ({country, onShow}) => {
  return (
    <p>{country.name.common} <button onClick={onShow}>Show</button></p>
  )
}

const CountriesList = ({countries, onShow}) => {
  if (!countries) {
    return
  }

  if (countries.length === 0) {
    return <p>No items matching the filtering.</p>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>
  }

  if (countries.length <= 10 && countries.length > 1) {
    return countries.map(c =>
      <CountryListItem
        key={c.name.common}
        country={c}
        onShow={() => onShow(c.name.common)}
      />
    )
  }

  if (countries.length === 1) {
    return <Country country={countries[0]}/>
  }
}

export default CountriesList