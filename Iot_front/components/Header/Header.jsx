import './Header.css'
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Header() {

    const [navElem, setNavElem] = useState("")

    const location = useLocation()

    useEffect(() => {
        const path = location.pathname
        if (path === "/") {
            setNavElem(<Link to="/roomlist" ><img id="map" src="/Mapsymbol.svg" alt="" /></Link>)
        } else if (path === "/roomlist") {
            setNavElem(<Link to="/" ><img id="map" src="/Hamburger.svg" alt="" /></Link>)
        }
    }, [location.pathname])

    return (
        <>
            <header>
                <nav>

                    <Link to="/" ><img id="logo" src="/Logo.svg" alt="" /></Link>
                    {navElem}



                </nav>
            </header>
        </>
    )
}

export default Header;