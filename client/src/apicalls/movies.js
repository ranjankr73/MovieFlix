import {api} from "./index.js";

//add a new movie
export const AddMovie = async (payload) => {
    try {
        const response = await api.post("/movies/add-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get all movies
export const GetAllMovies = async () => {
    try {
        const response = await api.get("/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// update a movie
export const UpdateMovie = async (payload) => {
    try {
        const response = await api.post("/movies/update-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// delete a movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await api.post("/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//get a movie by Id
export const  GetMovieById = async (id) => {
    try {
        const response = await api.get(`/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}