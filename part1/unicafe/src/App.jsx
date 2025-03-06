import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, avg}) => {
  if (total === 0) {
    return (
      <p>No feedback given.</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="Total" value={total} />
        <StatisticsLine text="Average" value={avg} />
      </tbody>
    </table>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [selectedAnecdote, setSelectedAnecdote] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [topAnecdote, setTopAnecdote] = useState(null)

  const handleGoodFB = () => {
    const newGood = good + 1
    const newTotal = newGood + neutral + bad
    setGood(newGood)
    setTotal(newTotal)
    setAvg((newGood - bad) / newTotal)
  }

  const handleNeutralFB = () => {
    const newNeutral = neutral + 1
    const newTotal = good + newNeutral + bad
    setNeutral(newNeutral)
    setTotal(newTotal)
    setAvg((good - bad) / newTotal)
  }

  const handleBadFB = () => {
    const newBad = bad + 1
    const newTotal = good + neutral + newBad 
    setBad(newBad)
    setTotal(newTotal)
    setAvg((good - newBad) / newTotal)
  }

  const handleRandomAnecdote = () => {
    setSelectedAnecdote(Math.floor(Math.random() * (anecdotes.length)))
  }

  const calculateTopAnecdote = (newVotes) => {
    const arrOfVotes = Object.values(newVotes)
    let idx = 0
    let max = arrOfVotes[idx]

    arrOfVotes.forEach((vote, i) => {
      if (vote > max) {
        max = vote
        idx = i
      }
    })

    return idx
  }

  const handleVote = () => {
    const newVotes = [...votes]

    newVotes[selectedAnecdote]
      ? newVotes[selectedAnecdote] += 1
      : newVotes[selectedAnecdote] = 1

    setVotes(newVotes)
    setTopAnecdote(calculateTopAnecdote(newVotes)) 
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodFB} text="Good" />
      <Button onClick={handleNeutralFB} text="Neutral" />
      <Button onClick={handleBadFB} text="Bad" />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
      />
      <h1>Anectdote</h1>
      <p>{anecdotes[selectedAnecdote]}</p>
      <Button onClick={handleRandomAnecdote} text="Next anecdote" />
      <Button onClick={handleVote} text="Vote" />
      <h1>Anecdote with more votes</h1>
      <p>{topAnecdote !== null ? anecdotes[topAnecdote] : "No votes available."}</p>
    </>
  )
}

export default App