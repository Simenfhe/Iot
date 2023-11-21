import './Header.css'
import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <header>
                <nav>
                    <div>


                        <Link to="/" ><img id="logo" src="/Logo.svg" alt="" /></Link>
                        <img id="map" src="/Mapsymbol.svg" alt="" />
                    </div>
                    <div>
                        <ul>
                            <li> <Link to="/roomlist" >Roomlist</Link> </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;