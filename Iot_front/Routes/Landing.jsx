import React, { useState, useEffect } from 'react';
import axios from '../functions/axios';
import Meter from '../components/Meter/Meter';
import Map from '../components/Map/Map';
import Histogram from '../components/Histogram/Histogram';
import Footer from '../components/Footer/Footer';

// import sensordata

function LandingPage() {
    const [count, setCount] = useState("0")
    const [temp, setTemp] = useState("0")
    const [air, setAir] = useState("0")
    // const capacity = 45




    return (
        <>
            <main>
                <Map />
                {/* <Histogram histogram={histogram} capacity={capacity} /> */}

            </main>
            <Footer />
        </>
    )


}

export default LandingPage