import "./Meter.css"
import React from "react"

function Meter(props) {

    let percentage = props.percentage
    let color

    //set color according to occupancy
    if (percentage < 50) {
        color = "green"
    } else if (percentage < 75) {
        color = "yellow"
    } else {
        color = "red"
    }

    //translate percentage into degrees
    let degrees = ((percentage * 180) / 100) - 90






    return (
        <div className="metercontainer" style={{ backgroundColor: color }} >

            <div className="meterneedle" style={{ transform: `rotate(${degrees}deg)` }}></div>
        </div>
    )

}

export default Meter