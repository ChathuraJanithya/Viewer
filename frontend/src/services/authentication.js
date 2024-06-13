import axios from "axios";

export const login = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}user/signin`,
      body
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};

export const register = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}user/signup`,
      body
    );

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
