import { api } from "./index.js";

//add a new theatre
export const AddTheatre = async (payload) => {
    try {
        const response = await api.post("/theatres/add-theatre", payload);
        console.log(response);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//get all theatres
export const GetAllTheatres = async () => {
    try {
        const response = await api.get("/theatres/get-all-theatres");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//get all theatres by owner
export const GetAllTheatresByOwner = async (payload) => {
    try {
        const response = await api.post("/theatres/get-all-theatres-by-owner", payload);
        console.log(response);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//update theatre
export const UpdateTheatre = async (payload) => {
    try {
        const response = await api.post("/theatres/update-theatre", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//delete theatre
export const DeleteTheatre = async (payload) => {
    try {
        const response = await api.post("/theatres/delete-theatre", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

//add show
export const AddShow = async (payload) => {
    try {
        const response = await api.post("/theatres/add-show", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//get all shows
export const GetAllShowsByTheatre = async (payload) => {
    try {
        const response = await api.post("/theatres/get-all-shows-by-theatre", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//delete show
export const DeleteShow = async (payload) => {
    try {
        const response = await api.post("/theatres/delete-show", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Get All Theatres By Movie
export const GetAllTheatresByMovie = async (payload) => {
    try {
      const response = await api.post(
        "/theatres/get-all-theatres-by-movie",
        payload);
      return response.data;
    } catch (error) {
      return error.response;
    }
  };
  

//Get Show By Id
  export const GetShowById = async (payload) => {
    try {
      const response = await api.post(
        "/theatres/get-show-by-id",
        payload);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
  