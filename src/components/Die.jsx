import React from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }

    return (
        <div onClick={props.holdDice} style={styles} className="die-face">
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}