import './RoomCard.css'
import React from 'react'
import { useEffect } from 'react'
import Meter from '../Meter/Meter'

function RoomCard(props) {
    var percentage = 0
    let room = props.room
    // roomid, roommax, roomcurrent, roomtemp, roomair, room location
    if (room) {
        percentage = room.roomcurrent / room.roommax * 100
    }



    return (
        <div>
            <ul>
                <li>Roomid : {room.roomid}</li>
                <li>Room capacity : {room.roommax}</li>
                <li>Current occupants : {room.roomcurrent}</li>
                <li>Current temperature : {room.roomtemp}</li>
            </ul>
            <Meter percentage={percentage} />
        </div>
    )
}

export default RoomCard