import './mapcard.css'
import React from 'react'
import { useEffect, useState } from 'react'
import Occupancymeter from '../Occupancymeter/Occupancymeter'
import AudioMeter from '../Audiometer/Audiometer'
import Temperatur from '../Tempmeter/Temperatur'
import Histogram from '../Histogram/Histogram'

function Mapcard(props) {


    const temp = 22
    const audio = 45



    const initpercent = props.room.count / props.room.capacity * 100
    const initavailable = props.room.capacity - props.room.count

    const [percent, setPercent] = useState(initpercent)
    const [available, setAvailable] = useState(initavailable)


    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/sse/Gjøvik/Bygg 118/Mesaninen");
        var data

        try {
            eventSource.onmessage = (event) => {
                console.log(event.data)
                data = event.data

                const per = data / props.room.capacity * 100
                console.log('++++++', data)
                setPercent(per)
                console.log(per)
                console.log('---', percent)
                const avail = props.room.capacity - data
                setAvailable(avail)
                console.log(avail)
                console.log('---', available)

            };
        } catch (e) {
            console.log(e)
        }



        return () => {
            eventSource.close(); // Close the EventSource when the component unmounts.
        };


    }, [])




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