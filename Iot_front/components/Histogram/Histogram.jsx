import React from 'react'
import { useEffect, useState } from 'react'
import './Histogram.css'

function Histogram(props) {

    const [histogram, setHistogram] = useState([props.histogram])
    useEffect(() => {
        setHistogram(props.histogram)
        for (let i = 5; i < histogram[0].length - 1; i++) {
            let height = histogram[0][i] / props.capacity * 100
            try {
                const el = document.querySelectorAll(`.rom${props.name} li`)[i]
                el.style.height = height + "%"
            } catch (e) {
                console.log(e)
            }
        }
    }, [])


    return (
        <><div className='histogram-container'>
            <div className='histogram'>
                <ul className={`bars rom${props.name}`} >
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
                <embed id="histogramlinje" src="/histogramlinje.svg" type="" />
            </div>
        </div>
        </>
    )

}

export default Histogram