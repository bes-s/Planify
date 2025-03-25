import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const authToken = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName"); // Assuming userName is stored in localStorage

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        navigate("/login");
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#f0f0f0" }}>
            <div>
                <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
                {authToken && <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>}
                {authToken && <Link to="/mybookings" style={{ marginRight: "1rem" }}>MyBookings</Link>}
            </div>
            <div>
                {authToken ? (
                    <>
                        <span style={{ marginRight: "1rem" }}>Welcome, {userName}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

