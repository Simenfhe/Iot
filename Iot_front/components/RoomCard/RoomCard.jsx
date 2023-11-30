import './RoomCard.css'
import React from 'react'
import { useEffect, useState } from 'react'
import Occupancymeter from '../Occupancymeter/Occupancymeter'
import AudioMeter from '../Audiometer/Audiometer'
import Temperatur from '../Tempmeter/Temperatur'
import Histogram from '../Histogram/Histogram'
import axios from '../../functions/axios'

function RoomCard(props) {


    var histogram = [0, 0, 3, 5, 12, 2, 4, 7, 12, 24, 25, 27, 21, 22, 23, 25, 14, 11, 7, 6, 5, 0, 3, 1]

    const temp = props.room.temperature
    const audio = props.room.audio
    const percent = props.room.count / props.room.capacity * 100

    var available = 5
    if (props.room.capacity) {
        available = props.room.capacity - props.room.count
    }



    useEffect(() => {
        if (props.room.roomId === 301) {
            try {
                axios.get('/counter/history/Gjøvik/Bygg 118/Mesaninen').then((response) => {
                    console.log(response.data)
                    histogram = response.data
                })
            } catch (e) {
                console.log('-------', e)
            }
        } else {
            histogram = [0, 0, 3, 5, 12, 2, 4, 7, 12, 24, 25, 27, 21, 22, 23, 25, 14, 11, 7, 6, 5, 0, 3, 1]
        }


    }, [])

    console.log(histogram)
    return (
        <div className='roomcard'>
            <div className='roomcard-title'>
                <h3 className='roomtext'>{props.room.roomNr}</h3>
                <div className="symbols">
                    <Occupancymeter percentage={percent} />
                    <AudioMeter audio={audio} />
                    <Temperatur temp={temp} />
                </div>
            </div>


            <div className="hidden extendedcontainer">
                {props.room.capacity && <div className="above"><Occupancymeter percentage={percent} /> <p>{available} av {props.room.capacity} plasser ledige</p></div>}
                <div className="histogramcontainer">
                    {histogram && <Histogram histogram={histogram} name={props.room.roomNr} capacity='50' />}

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