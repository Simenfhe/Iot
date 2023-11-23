import "./Occupancymeter.css"
import React from "react"
import { useState, useEffect } from 'react'

function Occupancymeter(props) {
    const [color, setColor] = useState('green')

    useEffect(() => {
        if (props.percentage > 75) {
            setColor('red');
        } else if (props.percentage > 50) {
            setColor('yellow');
        } else {
            setColor('green');
        }
    }, [props.percentage]);

    return (
        <div className="occupancy-wrapper">
            <div className="occupancy-container">
                <div className="occupancy-fill" style={{
                    width: props.percentage + "%",
                    backgroundColor: color
                }} ></div>
            </div>
        </div >
    )


}

export default Occupancymeter