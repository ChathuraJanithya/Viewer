import api from "../Helpers/axios";

export const createPdf = async (formData) => {
  try {
    console.log(formData);
    const { response } = await api.post("/pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};

export const getAllUserPdfs = async () => {
  try {
    const response = await api.get("/pdf/userpdf");

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};

export const getPdfById = async (id) => {
  try {
    const response = await api.get(`/pdf/${id}`);

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};

export const getAll = async () => {
  try {
    const response = await api.get("/pdf/");

    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
};
