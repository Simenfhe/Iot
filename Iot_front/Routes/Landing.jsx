import React, { useState, useEffect } from 'react';
import axios from '../functions/axios';

// import sensordata

function LandingPage() {
    const [count, setCount] = useState("0")
    const [temp, setTemp] = useState("0")
    const [air, setAir] = useState("0")

    useEffect(() => {
        axios.get("/counter").then((response) => {
            setCount(response.data)
            console.log(response.data)
        })

        axios.get("/temp").then((response) => {
            setTemp(response.data)
            console.log(temp)
        })

        axios.get("/air").then((response) => {
            setAir(response.data)
            console.log(air)
        })

    }, [])


    return (
        <main>
            <h1>Vælkømmin til gaars</h1>
            <ul>
                <li>Det er {count}stk i rommet</li>
                <li>Det er {temp} grader der</li>
                <li>Det er {air} luft et eller annet</li>
            </ul>
        </main>
    )


}

export default LandingPage