import React, { useState, useEffect } from 'react';
import axios from '../functions/axios';
import './RoomList.css'
import RoomCard from '../components/RoomCard/RoomCard';



const histogram = [0, 0, 3, 5, 12, 2, 4, 7, 12, 24, 25, 27, 21, 22, 23, 25, 14, 11, 7, 6, 5, 0, 3, 1]



function RoomList() {
    const [data, setData] = useState([])

    function showChildren(e) {
        e.target.parentNode.children[1].classList.toggle('hidden')
        console.log(e.target.parentNode.parentNode)
        if (e.target.classList[0] === 'roomcard-title') {
            e.target.parentNode.parentNode.classList.toggle('larger')
            e.target.children[1].classList.toggle('hidden')
        }
    }

    useEffect(() => {
        axios.get("/rooms").then((response) => {
            setData(response.data)
        })
    }, [])

    return (
        <div>
            {data.map((campus) => (
                <div key={campus._id} className='campus'>
                    <h2 className='campustitle' onClick={(e) => { showChildren(e) }}>{campus.name}</h2>
                    <ul className='hidden'>
                        {campus.buildings.map((building) => (
                            <li key={building._id} className='building' onClick={(e) => { showChildren(e) }}>
                                <h3 className='buildingtitle'>{building.name}</h3>
                                <ul className='hidden'>
                                    {building.rooms.map((room) => (
                                        <li className='roomtitle' key={room._id}>
                                            <RoomCard room={room} building={building.name} campus={campus.name} className='hidden' histogram={histogram} />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

    )

}
export default RoomList;
