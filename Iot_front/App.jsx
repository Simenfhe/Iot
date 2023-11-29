import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./Routes/Landing";
import RoomList from "./Routes/RoomList";
import "./App.css"

function App() {



    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/roomlist" element={<RoomList />} />


            </Routes>

        </>
    )
}

export default App