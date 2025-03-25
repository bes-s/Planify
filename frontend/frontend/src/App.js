import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import TripDetails from "./pages/TripDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/trip/:id"
                    element={
                        <ProtectedRoute>
                            <TripDetails />
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/mybookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />
            </Routes>
           
        </Router>
    );
}

export default App;
