import React, { useState, useEffect } from 'react';
import axios from '../functions/axios';
import './RoomList.css'

function RoomList() {
    const [rooms, setRooms] = useState([])

    function showChildren(e) {
        e.target.parentNode.children[1].classList.toggle('hidden')
    }

    function showRoomCard(campusid, buildingid, roomid) {
        console.log("campus", campusid)
        console.log("building", buildingid)
        console.log("room", roomid)
    }

    useEffect(() => {
        axios.get("/rooms").then((response) => {
            setRooms(response.data)
        })
    }, [])

    return (
        <div>
            {rooms.map((campus) => {
                return (
                    <div key={campus._id} className='campus' >
                        <h2 className='campustitle' onClick={(e) => { showChildren(e) }}>{campus.name}</h2>
                        <ul className='hidden'>
                            {
                                campus.buildings.map(building => {
                                    return (
                                        <>
                                            <li key={building._id} className='building' onClick={(e) => { showChildren(e) }}>
                                                <h3 className='buildingtitle'>{building.name}</h3>
                                                <ul className='hidden'>
                                                    {building.rooms.map(room => {
                                                        return (
                                                            <li className='roomtitle' key={room._id} onClick={() => {
                                                                showRoomCard(campus._id, building._id, room._id)
                                                            }}>Room {room.roomNr}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )

}
export default RoomList;
