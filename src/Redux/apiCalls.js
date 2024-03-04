import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`https://bookifypro.onrender.com/api/auth/login`, user);
    if (res) dispatch(loginSuccess(res.data));
    else dispatch(loginFailure());
  } catch (error) {
    res.json(error);
  }
};

export const register = async (user) => {
  try {
    const result = await axios.post(
      `https://bookifypro.onrender.com/api/auth/register`,
      user
    );
  } catch (error) {
    res.json(error);
  }
};

export const checkout = async (amount) => {
  try {
    const API = await axios.get(`https://bookifypro.onrender.com/api/getAPI`);
    const result = await axios.post(`https://bookifypro.onrender.com/api/checkout`, {
      amount: amount,
    });
    const options = {
      key: API.data, // Enter the Key ID generated from the Dashboard
      amount: result.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Booking App",
      image: "https://example.com/your_logo",
      order_id: result.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://bookifypro.onrender.com/api/paymentverification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
    console.log(error);
  }
};
