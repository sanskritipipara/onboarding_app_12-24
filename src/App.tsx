import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Home from "./components/Home.tsx";
import Onboarding from "./components/onboarding/index.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />}/>
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
