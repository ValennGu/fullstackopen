const Header = ({name}) => (
    <h1>{name}</h1>
)

const Part = ({name, exercises}) => (
    <p>{name} {exercises}</p>
)

const Content = ({parts}) => (
    parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
)

const Total = ({exercises}) => (
    <b>Total of {exercises.reduce((curr, acc) => curr + acc, 0)} exercises</b>
)

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts.map(part => part.exercises)} />
        </>
    )
}

export default Course