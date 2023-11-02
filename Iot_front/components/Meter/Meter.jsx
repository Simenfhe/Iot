import "./Meter.css"
import React from "react"

function Meter(props) {

    let percentage = props.percentage
    console.log(percentage)
    let color

    if (percentage < -30) {
        color = "green"
    } else if (percentage < 30) {
        color = "yellow"
    } else {
        color = "red"
    }




    return (
        <div className="metercontainer" style={{ backgroundColor: color }} >

            <div className="meterneedle" style={{ transform: `rotate(${percentage}deg)` }}></div>
        </div>
    )

}

export default Meter