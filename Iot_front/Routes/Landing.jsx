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
    // const histogram = [0, 0, 3, 5, 12, 2, 4, 7, 12, 24, 25, 27, 21, 22, 23, 25, 14, 11, 7, 6, 5, 0, 3, 1]
    // const capacity = 45

    useEffect(() => {

        const eventSource = new EventSource("http://localhost:5000/sse/5945");
        eventSource.onmessage = (event) => {
            setAir(event.data);
            console.log(event)
        };

        return () => {
            eventSource.close(); // Close the EventSource when the component unmounts.
        };


    }, [])


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