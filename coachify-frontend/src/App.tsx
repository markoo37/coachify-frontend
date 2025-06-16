import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import AthletesPage from './pages/AthletesPage';

function App() {
    return (
        <BrowserRouter>
            <div className="w-full min-h-screen">
                <Navbar />
                <main className="w-full">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/athletes" element={<AthletesPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;