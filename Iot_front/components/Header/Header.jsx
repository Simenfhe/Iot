import './Header.css'
import React from "react";

function Header() {
    return (
        <>
            <nav>
                <img id="logo" src="../../public/Logo.svg" alt="" />

                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Rooms</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Mora til håvard</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Header;