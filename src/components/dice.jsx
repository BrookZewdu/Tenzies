
import React from "react"
export default function Dice({number, isHeld, holdDice, id}) {
    
    return (
        <div className = {"dice " + (isHeld ? " clickedDice" : "")} onClick = {() => holdDice(id)} >{number}</div>
    )
}