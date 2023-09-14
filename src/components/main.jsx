import Dice from './dice'
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
export default function Main() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    function allNewDice() {
        let dices = []
        for (let i = 0; i < 10; i++) {
            dices.push({
                value : Math.floor(Math.random() * 6) + 1,
                isHeld : false,
                id : nanoid()
            })
        }
    
        return dices
    }
    
    let diceElements = dice.map((num) => {
        return <Dice key = {dice.id} number = {num.value} isHeld={num.isHeld} holdDice = {holdDice} id = {num.id}/>
    })

    function rollDice() {
        if (tenzies){
            setDice(allNewDice())
            setTenzies(false)

        }
        else
            setDice(dice.map((currentDice) => {
                return currentDice.isHeld ? 
                    currentDice : 
                    {...currentDice,
                    value : Math.ceil(Math.random() * 6)}
            }))
    }

    function holdDice(id) {
        setDice(dice.map(
            (currentDice) => {
                return currentDice.id == id ? {
                    ...currentDice,
                    isHeld : !currentDice.isHeld
                } : currentDice
            }
        ))

    }

    React.useEffect(() => {
        let last = dice[0].value
        let ans = true
        for (let i = 0; i < 10; i++) {
            ans = ans & ((dice[i].value === last) & dice[i].isHeld)
        }
        // console.log('tenzies', ans)
        if (ans)
            setTenzies(true)
    }, [dice])

    return (
            <div className = "main--container">
                {tenzies ? <Confetti /> : ''}
                <h1>Tenzies</h1>
                <h3>Roll until all dice are the same. 
                    Click each die to freeze it at its current 
                    value between rolls.</h3>

                <div className="main--numbers"></div>
                <div className="Dices">
                    {diceElements}
                </div>
                <button className = "main--btn" onClick = {rollDice}>{tenzies ? "Reset Game" : "Roll"}</button>
            </div>
    )
}