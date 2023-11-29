import React from "react"
import { useState, useEffect } from 'react'

function Temperatur(props) {

    const [svg, setSvg] = useState("/optimal.svg")


    useEffect(() => {

        if (props.temp >= 26) {
            setSvg("/varmest.svg")
        } else if (props.temp >= 23) {
            setSvg("/varmere.svg")
        } else if (props.temp >= 19) {
            setSvg("/optimalt.svg")
        } else {
            setSvg("/kaldt.svg")
        }
    }, [props.temp])

    return (
        <div className="audio">
            <embed src={svg} type="" />
        </div>
    )

}

export default Temperatur