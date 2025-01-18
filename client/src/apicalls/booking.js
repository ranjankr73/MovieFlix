import {api} from "./index.js";

// make payment
export const MakePayment = async (token, amount) => {
  try {
    const response = await api.post("/bookings/make-payment", {
      token,
      amount,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//book shows
export const BookShowTickets = async (payload) => {
  try {
    const response = await api.post("/bookings/book-show", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//get bookings of a user
export const GetBookingsOfUser = async () => {
  try {
    const response = await api.get("/bookings/get-bookings");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};