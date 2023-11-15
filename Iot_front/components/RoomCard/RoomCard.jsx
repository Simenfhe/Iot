import './RoomCard.css'
import React from 'react'
import { useEffect } from 'react'
import Meter from '../Meter/Meter'

function RoomCard(room, campus, building) {
    var percentage = 0
    // let room = room
    // roomid, roommax, roomcurrent, roomtemp, roomair, room location
    if (room) {
        percentage = room.roomcurrent / room.roommax * 100
    }

    console.log("campus", campus)
    console.log("building", building)

    return (
        <div>
            <h3>{room.roomname}()</h3>
            <h4>{percentage}% opptatt</h4>
            {/* placeholder for histogramm component */}
            <div>
                <ul>
                    <li><p>Temperatur:</p>  <p>{room.roomtemp || 20}</p> </li>
                    <li><p>Lydnivå:</p>  <p>{room.roomsound || 31}</p> </li>
                </ul>
                <div>
                    {/* placeholder fro tempgreie og lydgreie */}
                </div>
            </div>

        </div>
    )
}

export default RoomCard