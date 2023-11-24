import './Map.css'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import RoomCard from '../RoomCard/RoomCard'

function Map() {
    const [currentRoom, setCurrentRoom] = useState()
    const [modalOpen, setModalOpen] = useState(false)

    let katedralen = { roomcurrent: 10, roommax: 30, roomid: 69420, roomtemp: 22 }
    let mezza = { roomcurrent: 40, roommax: 60, roomid: 666, roomtemp: 55 }
    // rooms.addEventListener("click", showRoomInfo)

    useEffect(() => {

        dragElement(document.getElementById("mappern"));
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var elmnt = document.getElementById("mappern");

        function dragElement(elmnt) {
            elmnt.onmousedown = dragMouseDown;
            elmnt.ontouchstart = dragMouseDown;
        }

        function dragMouseDown(e) {
            e.preventDefault();
            console.log(e.type)
            if (e.type === 'touchstart') {
                pos3 = e.touches[0].clientX;
                pos4 = e.touches[0].clientY;
            } else {
                pos3 = e.clientX;
                pos4 = e.clientY;
            }

            document.onmouseup = closeDragElement;
            document.ontouchend = closeDragElement;

            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {

            if (e.type === 'touchmove') {
                var clientX = e.touches[0].clientX;
                var clientY = e.touches[0].clientY;
            } else {
                var clientX = e.clientX;
                var clientY = e.clientY;
            }

            pos1 = pos3 - clientX;
            pos2 = pos4 - clientY;
            pos3 = clientX;
            pos4 = clientY;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        }

        function closeDragElement() {
            document.onmouseup = null;
            document.ontouchend = null;
            document.onmousemove = null;
            document.ontouchmove = null;
        }


    }, [])



    function showRoomInfo(room) {
        setModalOpen(true)
        setCurrentRoom(room)
    }

    function closeModal() {
        setModalOpen(false)
    }



    return (
        <>
            <div className="mapwrap" >
                <div id='mappern'>
                    <svg className='map' viewBox="0 0 715 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="mapelement room" id="katedralen" onClick={() => showRoomInfo(katedralen)} d="M58.5 110.5L217 46.9999L340.5 0.5L383 21L422 115.5L142.5 226.996L104 126.5L70.5 140L58.5 110.5Z" fill="currentColor" stroke='#494949' stroke-width={'3px'} />
                        <text className='svglabel' x='200' y='100' fill='black' > Katedralen</text>
                        <text className='svglabel' x='180' y='125' fill='black'> (Mustad bygg 118)</text>
                        <path className="mapelement room" id="mezza" onClick={() => showRoomInfo(mezza)} d="M322 163.5L429.5 122L433 125.5L551 79L629.5 47.5L715 247.504L435.5 359L312.5 404L305 389L252 408.5L201 285.5L345.5 226.5L322 163.5Z" fill="currentColor" stroke='#494949' stroke-width={'3px'} />
                        <text className='svglabel' x='420' y='220' fill='black' > Mezaninen</text>
                        <text className='svglabel' x='400' y='245' fill='black'> (Mustad bygg 118)</text>
                        <path className="mapelement hallway" d="M163 233.5L274.5 187L272 175.5L299.5 165L302.5 173L322.5 166.5L344 221.5L195 282L268.5 474.5L208 497.5L133.5 307L131 299.5L127 301L102 242L96.5 244.5L89 227.5L86 220L35 241L0.5 160.5L55.5 137.5L62 154.5L75 149.5L93.5 142L128 225L122 227.5L129 246L151.5 237.5L157.5 250.5L168 247L163 233.5Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
            {modalOpen && (
                <>
                    <RoomCard room={currentRoom} />
                    <button onClick={closeModal}>Close</button>
                </>
            )}

        </>
    )


}

export default Map