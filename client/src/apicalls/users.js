import { api } from "./index.js";

//Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await api.post("/users/register", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//Login a user
export const LoginUser = async(payload) => {
    try {
        const response = await api.post("/users/login", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get current user
export const GetCurrentUser = async() => {
    try {
        const response = await api.get("/users/get-current-user");
        console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
}