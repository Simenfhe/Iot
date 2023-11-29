import './RoomCard.css'
import React from 'react'
import { useEffect } from 'react'
import Occupancymeter from '../Occupancymeter/Occupancymeter'
import AudioMeter from '../Audiometer/Audiometer'
import Temperatur from '../Tempmeter/Temperatur'
import Histogram from '../Histogram/Histogram'

function RoomCard(props) {
    // console.log(props.room)
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
        <div className='roomcard'>
            <div className='roomcard-title'>
                <h3 className='roomtext'> Rom {props.room.roomNr}</h3>
                <div className="symbols">
                    <Occupancymeter percentage={percent} />
                    <AudioMeter audio={audio} />
                    <Temperatur temp={temp} />
                </div>
            </div>

            {/* <div className="above"><Occupancymeter percentage={percent} /> <p>{available} av {props.room.capacity} plasser ledige</p></div> */}
            <div className="hidden extendedcontainer">
                {props.room.capacity && <div className="above"><Occupancymeter percentage={percent} /> <p>{available} av {props.room.capacity} plasser ledige</p></div>}
                <div className="histogramcontainer">
                    <Histogram histogram={props.histogram} name={props.room.roomNr} capacity='50' />
                </div>
                <div className="bottomcontainer">
                    <div className="textcontainer">
                        <li><p>Temperatur:</p> <p>{temp}C°</p> </li>
                        <li><p>Lydnivå:</p> <p>{audio}dB</p> </li>
                    </div>
                    <div className="symbolcontainer">
                        <AudioMeter audio={audio} />
                        <Temperatur temp={temp} />
                    </div>
                </div>
            </div>


        </div>

    )
}

export default RoomCard