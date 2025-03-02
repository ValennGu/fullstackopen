const Header = (props) => {
  return <h1>{props.title}</h1>
}
const Part = (props) => {
  return <p>{props.title} -- {props.exercises}</p>
}
const Content = (props) => {
  return props.list.map(el => <Part title={el.title} exercises={el.exercises} />)
}
const Total = (props) => {
  return <p>Number of exercises {props.exercises.reduce((curr, acc) => curr + acc, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const list = [
    { title: 'Fundamentals of React', exercises: 10 },
    { title: 'Using props to pass data', exercises: 7 },
    { title: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      <Header title={course} />
      <Content list={list} />
      <Total exercises={list.map(el => el.exercises)}/>
    </div>
  )
}

export default App
