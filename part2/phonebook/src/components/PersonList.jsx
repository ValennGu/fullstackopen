const Person = ({id, name, number, onDelete}) =>
    <tr>
        <td><b>{name}</b></td> 
        <td>({number})</td>
        <td><button onClick={() => onDelete(id)}>Delete</button></td>
    </tr>

const PersonList = ({list, onDelete}) => 
    <table>
        <tbody>
            {list.map(person =>
                <Person
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    number={person.number}
                    onDelete={onDelete}
                />)}
        </tbody>
    </table>

export default PersonList