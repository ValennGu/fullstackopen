const Person = ({name, number}) =>
    <tr>
        <td><b>{name}</b></td> 
        <td>({number})</td>
    </tr>

const PersonList = ({list}) => 
    <table>
        <tbody>
            {list.map(person =>
                <Person
                    key={person.id}
                    name={person.name}
                    number={person.number}
                />)}
        </tbody>
    </table>

export default PersonList