const PersonForm = ({onSubmit, name, number, onNameChange, onNumberChange}) => 
  <form onSubmit={onSubmit}>
    <div>
      Name: <input value={name} onChange={onNameChange}/>
    </div>
    <div>
      Number: <input value={number} onChange={onNumberChange}/>
    </div>
    <div>
      <button type="submit">Add person</button>
    </div>
  </form>

export default PersonForm