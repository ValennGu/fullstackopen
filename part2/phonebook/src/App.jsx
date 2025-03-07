import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

const App = () => {
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      .catch(err => console.log(err.message))
  }, [])

  const onFilterChange = (event) => setFilter(event.target.value)
  const onNewNameChange = (event) => setNewName(event.target.value)
  const onNewNumberChange = (event) => setNewNumber(event.target.value)

  const onAddPerson = (event) => {
    event.preventDefault()
    setNewName('')
    setNewNumber('')

    if (persons.some(person => person.name === newName || person.number === newNumber)) {
      alert(`${newName}(${newNumber}) is alredy in the Phonebook.`)
      return
    }

    setPersons([
      ...persons,
      { name: newName, number: newNumber, id: Math.random() }
    ])
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        onSubmit={onAddPerson}
        name={newName}
        number={newNumber}
        onNameChange={onNewNameChange}
        onNumberChange={onNewNumberChange}
      />
      <h2>Numbers</h2>
      <input value={filter} onChange={onFilterChange} />
      <PersonList list={filteredPersons} />
    </div>
  )
}

export default App