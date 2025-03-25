import React, { useEffect, useState } from "react";
import { getTrips } from "../services/tripService";

const HomePage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await getTrips();
                setTrips(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch trips", error);
            }
        };
        fetchTrips();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>Available Trips</h1>
            <ul>
                {trips.map((trip) => (
                    <li key={trip.id}>
                        {trip.title} - {trip.location} (${trip.price})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
