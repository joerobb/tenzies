import React from "react"

export default function Counter(props) {
    return (
        <div className="counter">
            <h2 className="counter-num">{props.count}</h2>
        </div>
    )
}