import React, { useState, useEffect } from "react";
import API from "../services/api";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Replace with actual user ID retrieval
                const response = await API.get(`/api/bookings/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error.response || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h1>My Bookings</h1>
            {isLoading ? (
                <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {bookings.map((booking) => (
                        <li
                            key={booking.id}
                            style={{
                                borderBottom: "1px solid #ccc",
                                padding: "10px 0",
                                marginBottom: "10px",
                            }}
                        >
                            <h3>{booking.trip?.title || "No Title"}</h3>
                            <p>{booking.trip?.description || "No Description"}</p>
                            <p><strong>Location:</strong> {booking.trip?.location || "No Location"}</p>
                            <p><strong>Price:</strong> ${booking.trip?.price || "0.00"}</p>
                            <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBookings;
