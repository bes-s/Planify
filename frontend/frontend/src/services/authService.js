import API from "./api";

export const login = async (email, password) => {
    try {
        const response = await API.post("/auth/login", { email, password });
        const { token, name } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", name); // Save user's name
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response || error.message);
        throw error;
    }
};


export const register = async (name, email, password) => {
    try {
        const response = await API.post("/auth/register", { name, email, password });
        return response.data;
    } catch (error) {
        console.error("Registration failed", error);
        throw error;
    }
};
