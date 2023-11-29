import React, { useState, useEffect } from 'react';
import axios from '../functions/axios';
import './RoomList.css'
import RoomCard from '../components/RoomCard/RoomCard';
import Occupancymeter from '../components/Occupancymeter/Occupancymeter';


import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

function RoomList() {
    const [data, setData] = useState([])

    function showChildren(e) {
        e.target.parentNode.children[1].classList.toggle('hidden')
    }

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    useEffect(() => {
        axios.get("/rooms").then((response) => {
            setData(response.data)
        })
    }, [])

    return (
        <>
            <div>
                {data.map((campus) => {
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
                                                                <>
                                                                    <li className='roomtitle' key={room._id} onClick={(e) => { showChildren(e) }}>Room {room.roomNr}
                                                                        <RoomCard room={room} building={building.name} campus={campus.name} className='hidden' />
                                                                    </li>
                                                                </>
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
            <Occupancymeter percentage='76' />
        </>
    )

}
export default RoomList;
