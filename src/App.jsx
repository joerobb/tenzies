import React from "react"
import Die from "./components/Die"
import Counter from "./components/Counter"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
export default function App() {


    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    const [count, setCount] = React.useState(0)

    const [bestScore, setBestScore] = React.useState(100)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollNewDice() {
        setDice(oldDice => oldDice.map(die => {
            return !die.isHeld ? 
                generateNewDie() :
                die
        }))

        setCount(prevCount => prevCount + 1)
    }

    function newGame() {
        setDice(allNewDice())
        setTenzies(false)
        if (count < bestScore) {
            localStorage.setItem("bestScore", JSON.stringify(count));
            setBestScore(count)
        }
        setCount(0)
    }

    function holdDice(id) {
        setDice(prevDice => {
            return prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
        })
    }

    function clearBestScore() {
        localStorage.clear()
        setBestScore(100)
    }
    
    const diceElements = dice.map(die => (
        <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />))


    const highScore = JSON.parse(localStorage.getItem('bestScore'))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="counterContainer">
            <p className="counter-text">Score:</p>
                <Counter count={count} />
            <p className="best-score-text">Best Score:</p>
            <h2 className="best-score">{bestScore === 100 ? " " : bestScore}</h2>
            <button className="clear-bs" onClick={clearBestScore}>Clear Best Score</button>
            <button className="roll-dice" onClick={tenzies ? newGame : rollNewDice}>{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </main>
    )
}



