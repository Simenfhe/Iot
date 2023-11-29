import './Map.css'
import React, { useEffect, useState } from 'react'
import RoomParticles from '../Particle/Particle'
import axios from '../../functions/axios';
import Mapcard from '../mapcard/mapcard';

function Map() {
    const [data, setData] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const katedralen = { roomcurrent: 10, roommax: 30, roomId: 69420, axios: "/Gjøvik/Bygg 118/301" };
    const mezza = { roomcurrent: 40, roommax: 60, roomId: 666, roomtemp: 55, axios: "/Gjøvik/Bygg 118/203" };
    const histogram = [0, 0, 3, 5, 12, 2, 4, 7, 12, 24, 25, 27, 21, 22, 23, 25, 14, 11, 7, 6, 5, 0, 3, 1]




    const temp1 = 22
    const temp2 = 25
    const audio1 = 45
    const audio2 = 55
    const percent1 = 35
    const percent2 = 55




    useEffect(() => {
        const elmnt = document.getElementById("mappern");

        let startX, startY;
        let isDragging = false;

        function startDrag(e) {
            isDragging = false;

            startX = e.touches ? e.touches[0].clientX : e.clientX;
            startY = e.touches ? e.touches[0].clientY : e.clientY;

            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", endDrag);

            document.addEventListener("touchmove", drag);
            document.addEventListener("touchend", endDrag);
        }

        function drag(e) {
            const currentX = e.touches ? e.touches[0].clientX : e.clientX;
            const currentY = e.touches ? e.touches[0].clientY : e.clientY;

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
                isDragging = true;
            }

            if (isDragging) {
                elmnt.style.left = elmnt.offsetLeft + deltaX + "px";
                elmnt.style.top = elmnt.offsetTop + deltaY + "px";
            }

            startX = currentX;
            startY = currentY;
        }

        function endDrag(e) {

            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", endDrag);

            document.removeEventListener("touchmove", drag);
            document.removeEventListener("touchend", endDrag);
        }

        // Add click event listeners to child elements
        const child1 = document.querySelector("#katedralen");
        const child2 = document.querySelector("#mezza");

        child1.addEventListener("click", () => handleChildClick(katedralen));
        child2.addEventListener("click", () => handleChildClick(mezza));

        function handleChildClick(room) {
            axios.get(`/rooms${room.axios}`).then((response) => {
                console.log(response.data)
                if (response.data) {
                    console.log("halla")
                    setData(response.data)
                }
                console.log(data)

            })



            setModalOpen(true);
        }

        elmnt.addEventListener("mousedown", startDrag);
        elmnt.addEventListener("touchstart", startDrag);

        return () => {
            elmnt.removeEventListener("mousedown", startDrag);
            elmnt.removeEventListener("touchstart", startDrag);

            child1.removeEventListener("click", () => handleChildClick(katedralen));
            child2.removeEventListener("click", () => handleChildClick(mezza));
        };
    }, [katedralen, mezza]);

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <>
            <div className="mapwrap" >
                <div id='mappern'>
                    <svg className='map' viewBox="0 0 715 500" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g>
                            <path className="mapelement room" id="katedralen" d="M58.5 110.5L217 46.9999L340.5 0.5L383 21L422 115.5L142.5 226.996L104 126.5L70.5 140L58.5 110.5Z" fill="currentColor" stroke='#494949' strokeWidth={'3px'} />

                            <foreignObject id='foreignkatedralen' x="200" y="50">
                                <RoomParticles id="katedralen" intensity={50} speed={1} />
                            </foreignObject>
                            <rect className="svglabel-back" x="165" y="82" width="160" height="50" rx={10} fill="currentcolor" />
                            <text className='svglabel' x='200' y='100' fill='black' > Katedralen</text>
                            <text className='svglabel' x='180' y='125' fill='black'> (Mustad bygg 118)</text>



                        </g>
                        <g>
                            <path className="mapelement room" id="mezza" d="M322 163.5L429.5 122L433 125.5L551 79L629.5 47.5L715 247.504L435.5 359L312.5 404L305 389L252 408.5L201 285.5L345.5 226.5L322 163.5Z" fill="currentColor" stroke='#494949' strokeWidth={'3px'} />
                            <foreignObject id='foreignmezza' x="350" y="150">
                                <RoomParticles id="mezza" intensity={15} speed={2} />
                            </foreignObject>
                            <rect className="svglabel-back" x="385" y="202.5" width="160" height="50" rx={10} fill="currentcolor" />
                            <text className='svglabel' x='420' y='220' fill='black' > Mezaninen</text>
                            <text className='svglabel' x='400' y='245' fill='black'> (Mustad bygg 118)</text>
                        </g>


                        <path className="mapelement hallway" d="M163 233.5L274.5 187L272 175.5L299.5 165L302.5 173L322.5 166.5L344 221.5L195 282L268.5 474.5L208 497.5L133.5 307L131 299.5L127 301L102 242L96.5 244.5L89 227.5L86 220L35 241L0.5 160.5L55.5 137.5L62 154.5L75 149.5L93.5 142L128 225L122 227.5L129 246L151.5 237.5L157.5 250.5L168 247L163 233.5Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
            {modalOpen && (
                <div className='modal'>
                    {data && <h2 className="modaltitle"> <p>Rom {data.roomNr}</p><button id="modalclose" onClick={closeModal}>X</button></h2>}
                    {data && <Mapcard room={data} histogram={histogram} />}


                </div>
            )}

        </>
    )


}

export default Map