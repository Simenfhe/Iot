import './RoomCard.css'
import React from 'react'
import { useEffect } from 'react'
import Meter from '../Meter/Meter'

function RoomCard(props) {
    var percentage = 0
    // let room = room
    // roomid, roommax, roomcurrent, roomtemp, roomair, room location
    if (props.room) {
        percentage = props.room.roomcurrent / props.room.roommax * 100
    }
    console.log("room", props.room)
    console.log("campus", props.campus)
    console.log("building", props.building)

    return (
        <div>
            <h3>{props.room.roomname}({props.campus} {props.building})</h3>
            <h4>{percentage}% opptatt</h4>
            {/* placeholder for histogramm component */}
            <div>
                <ul>
                    <li><p>Temperatur:</p>  <p>{props.room.roomtemp || 20}</p> </li>
                    <li><p>Lydnivå:</p>  <p>{props.room.roomsound || 31}</p> </li>
                </ul>
                <div>
                    {/* placeholder fro tempgreie og lydgreie */}
                </div>
            </div>

        </div>
    )
}

export default RoomCard