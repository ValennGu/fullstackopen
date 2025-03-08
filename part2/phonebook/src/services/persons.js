import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
)

const create = (person) => (
  axios
    .post(baseUrl, person)
    .then(response => response.data)
)

const deleteById = (id) => (
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
)

const update = (person) => (
  axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
)

export default { getAll, create, deleteById, update }