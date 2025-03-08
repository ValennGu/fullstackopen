import { useState, useEffect } from 'react'

import PersonsService from './services/persons'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

const App = () => {
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    PersonsService
      .getAll()
      .then(data => setPersons(data))
      .catch(err => console.log(err.message))
  }, [])

  const onFilterChange = (event) => setFilter(event.target.value)
  const onNewNameChange = (event) => setNewName(event.target.value)
  const onNewNumberChange = (event) => setNewNumber(event.target.value)

  const onAddPerson = (event) => {
    event.preventDefault()
    setNewName('')
    setNewNumber('')

    if (persons.some(person => person.number === newNumber)) {
      alert(`(${newNumber}) is already set for someone else.`)
      return
    }

    if (persons.some(person => person.name === newName && person.number !== newNumber)) {
      if (window.confirm(`${newName} is already on your phonebook, but it seems the number has changed. Do you want to overide the number?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        PersonsService
          .update({ ...personToUpdate, number: newNumber })
          .then(data => setPersons([ ...persons.filter(p => p.id !== data.id), data ]))
          .catch(err => console.log(err))
      }
      
      return
    }

    if (persons.some(person => person.name === newName || person.number === newNumber)) {
      alert(`${newName}(${newNumber}) is alredy in the Phonebook.`)
      return
    }

    PersonsService
      .create({ name: newName, number: newNumber })
      .then(response => setPersons([ ...persons, response ]))
      .catch(err => console.log(err))
  }

  const onDeletePerson = (id) => {
    if (window.confirm('Are you sure about deleting that entry?')) {
      PersonsService
        .deleteById(id)
        .then(data => setPersons(persons.filter(person => person.id !== data.id)))
        .catch(err => console.log(err))
    }
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
      <PersonList list={filteredPersons} onDelete={onDeletePerson}/>
    </div>
  )
}

export default App