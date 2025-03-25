import React, { useState, useEffect } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTrip, setNewTrip] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
    });
    const [editingTrip, setEditingTrip] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Assuming you store user ID in localStorage
                const endpoint = userId ? `/api/trips?userId=${userId}` : "/api/trips";
                const response = await API.get(endpoint);
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error.response || error.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchTrips();
    }, []);
    

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingTrip) {
            setEditingTrip((prev) => ({ ...prev, [name]: value }));
        } else {
            setNewTrip((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle creating a trip
    const handleCreateTrip = async (e) => {
        e.preventDefault();
        try {
            console.log("Creating trip with data:", newTrip); // Log the payload
            const response = await API.post("/api/trips", {
                ...newTrip,
                startDate: "2025-01-10", // Replace with actual input
                endDate: "2025-01-15", // Replace with actual input
                createdById: 1, // Replace with the actual user ID
            });
            setTrips((prev) => [...prev, response.data]);
            setNewTrip({ title: "", description: "", location: "", price: "" }); // Reset form
        } catch (error) {
            console.error("Error creating trip:", error.response || error.message);
        }
    };
    

    // Handle updating a trip
    const handleUpdateTrip = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/api/trips/${editingTrip.id}`, editingTrip);
            setTrips((prev) =>
                prev.map((trip) => (trip.id === editingTrip.id ? response.data : trip))
            );
            setEditingTrip(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating trip:", error.response || error.message);
        }
    };

    // Handle deleting a trip
    const handleDeleteTrip = async (id) => {
        try {
            await API.delete(`/api/trips/${id}`);
            setTrips((prev) => prev.filter((trip) => trip.id !== id));
        } catch (error) {
            console.error("Error deleting trip:", error.response || error.message);
        }
    };

    const handleBookTrip = async (tripId) => {
        try {
            const response = await API.post("/api/bookings", { tripId });
            alert("Booking successful!");
        } catch (error) {
            console.error("Error booking trip:", error.response || error.message);
            alert("Failed to book trip.");
        }
    };
    

    return (
        <div>
            <h1>Dashboard</h1>
    
            <form onSubmit={editingTrip ? handleUpdateTrip : handleCreateTrip} style={{ marginBottom: "20px" }}>
    <h2>{editingTrip ? "Edit Trip" : "Create New Trip"}</h2>
    <div style={{ marginBottom: "10px" }}>
        <input
            type="text"
            name="title"
            placeholder="Title"
            value={editingTrip ? editingTrip.title || "" : newTrip.title || ""}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px", padding: "5px", width: "200px" }}
        />
        <input
            type="text"
            name="description"
            placeholder="Description"
            value={editingTrip ? editingTrip.description || "" : newTrip.description || ""}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />
    </div>
    <div style={{ marginBottom: "10px" }}>
        <input
            type="text"
            name="location"
            placeholder="Location"
            value={editingTrip ? editingTrip.location || "" : newTrip.location || ""}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px", padding: "5px", width: "200px" }}
        />
        <input
            type="number"
            name="price"
            placeholder="Price"
            value={editingTrip ? editingTrip.price || "" : newTrip.price || ""}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px", padding: "5px", width: "100px" }}
        />
    </div>
    <div style={{ marginBottom: "10px" }}>
        <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={editingTrip ? editingTrip.startDate || "" : newTrip.startDate || ""}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px", padding: "5px", width: "150px" }}
        />
        <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={editingTrip ? editingTrip.endDate || "" : newTrip.endDate || ""}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px", padding: "5px", width: "150px" }}
        />
    </div>
    <button type="submit" style={{ marginRight: "10px", padding: "5px 15px" }}>
        {editingTrip ? "Update Trip" : "Create Trip"}
    </button>
    {editingTrip && (
        <button
            type="button"
            onClick={() => setEditingTrip(null)}
            style={{ padding: "5px 15px", backgroundColor: "red", color: "white" }}
        >
            Cancel
        </button>
    )}
</form>

            {/* Display Trips */}
            {isLoading ? (
                <p>Loading trips...</p>
            ) : (
                <div>
                    {trips.length === 0 ? (
                        <p>No trips available.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {trips.map((trip) => (
                                <li key={trip.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", paddingBottom: "10px" }}>
                                    <h3>{trip.title}</h3>
                                    <p><strong>Description:</strong> {trip.description}</p>
                                    <p><strong>Location:</strong> {trip.location}</p>
                                    <p><strong>Price:</strong> ${trip.price}</p>
                                    <p>
                                        <strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()} &nbsp;
                                        <strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => handleDeleteTrip(trip.id)}
                                        style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "red", color: "white" }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setEditingTrip(trip)}
                                        style={{ padding: "5px 10px", backgroundColor: "blue", color: "white" }}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleBookTrip(trip.id)} style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "green", color: "white" }}>
    Book Trip
</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}    

export default Dashboard;
