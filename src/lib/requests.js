import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export const request = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

export const searchTransactions = async (body) => {
  const response = await request.post("/transaction/search", {
    ...body,
  });
  const data = response.data;
  return data;
};

export const getStats = async () => {
  const response = await request.post("/reporting/week");
  const data = response.data;
  return data;
};

export const getDailyTotal = async () => {
  const response = await request.get("/reporting/unsettled/total");
  const data = response.data;
  return data;
};

export const getHostedToken = async (body) => {
  const response = await request.post("/vt/hosted", { ...body });
  return response;
};

export const generateTransaction = async () => {
  const response = await request.post("/transaction/generate");
  return response;
};

export const createCustomer = async (body) => {
  const response = await request.post("/customer/create", { ...body });
  return response;
};
