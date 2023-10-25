import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./Routes/Landing";
import "./App.css"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<LandingPage />} />


            </Routes>

            <Footer />
        </>
    )
}

export default App