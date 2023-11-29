import './mapcard.css'
import React from 'react'
import { useEffect } from 'react'
import Occupancymeter from '../Occupancymeter/Occupancymeter'
import AudioMeter from '../Audiometer/Audiometer'
import Temperatur from '../Tempmeter/Temperatur'
import Histogram from '../Histogram/Histogram'

function Mapcard(props) {
    console.log("hgallo")
    console.log(props.room)
    // if (props.room) {
    //     percentage = props.room.roomcurrent / props.room.roommax * 100
    // }

    const temp = 22
    const audio = 45
    const percent = 35

    var available = 5
    if (props.room.capacity) {
        available = props.room.capacity - props.room.count
    }


    return (
        <div className='roomcard1'>
            <div className="extendedcontainer1">
                {props.room.capacity && <div className="above1 "><Occupancymeter percentage={percent} /> <p className='mapabove'>{available} av {props.room.capacity} plasser ledige</p></div>}
                <div className="histogramcontainer1">
                    <Histogram histogram={props.histogram} name={props.room.roomNr} capacity='50' />
                </div>
                <div className="bottomcontainer1">
                    <div className="textcontainer1">
                        <li><p>Temperatur:</p> <p>{temp}C°</p> </li>
                        <li><p>Lydnivå:</p> <p>{audio}dB</p> </li>
                    </div>
                    <div className="symbolcontainer1">
                        <AudioMeter audio={audio} />
                        <Temperatur temp={temp} />
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Mapcard