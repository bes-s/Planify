import API from "./api";

export const getTrips = async () => {
    try {
        const response = await API.get("/trips");
        return response.data;
    } catch (error) {
        console.error("Error fetching trips", error);
        throw error;
    }
};

export const getTripById = async (id) => {
    try {
        const response = await API.get(`/trips/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching trip with id ${id}`, error);
        throw error;
    }
};
