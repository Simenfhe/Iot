import React from "react"
import { useState, useEffect } from 'react'
import "./AudioMeter.css"

function AudioMeter(props) {

    const [svg, setSvg] = useState("/lavlyd.svg")


    useEffect(() => {

        if (props.audio >= 50) {
            setSvg("/høylyd.svg")
        } else if (props.audio >= 40) {
            setSvg("/mediumlyd.svg")
        } else {
            setSvg("/lavlyd.svg")
        }
    }, [props.audio])



    return (
        <div className="audio">
            <embed src={svg} type="" />
        </div>
    )

}
export default AudioMeter