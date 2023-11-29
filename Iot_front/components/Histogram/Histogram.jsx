import React from 'react'
import { useEffect, useState } from 'react'
import './Histogram.css'

function Histogram(props) {

    const [histogram, setHistogram] = useState([])
    useEffect(() => {
        setHistogram(props.histogram)
    }, [props.histogram])


    for (let i = 5; i < props.histogram.length - 1; i++) {
        // [i].style.backgroundColor = "red"
        let height = props.histogram[i] / props.capacity * 100
        try {
            const el = document.querySelectorAll(".bars li")[i]
            el.style.height = height + "%"
        } catch (e) {
        }
    }

    return (
        <><div className='histogram-container'>
            <div className='histogram'>
                <ul className="bars">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <embed src="/histogramlinje.svg" type="" />
            </div>
        </div>
        </>
    )

}

export default Histogram