import axios from "axios";
  
//Register a new user
export const RegisterUser = async (payload) => {
    try {
        const response = await axios.post("http://localhost:5000/api/users/register", payload,{ withCredentials: true });
        console.log(response);
        return response;
    } catch (error) {
        return error.message;
    }
}

//Login a user
export const LoginUser = async(payload) => {
    try {
        console.log(payload);
        const response = await axios.post("http://localhost:5000/api/users/login", payload,{ withCredentials: true});
        console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//get current user
export const GetCurrentUser = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/users/get-current-user",{ withCredentials: true});
        console.log(response);
        return response.data;
    } catch (error) {
        return error.message;
    }
}