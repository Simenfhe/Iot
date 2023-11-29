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
            {/* <Particles
                // style={
                //     width = "50%"
                // }
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push",
                            },
                            onHover: {
                                enable: false,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#378805",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: false,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 30,
                        },
                        opacity: {
                            value: 1,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 5, max: 15 },
                        },
                    },
                    detectRetina: true,
                }}
            /> */}
        </>
    )

}
export default RoomList;
