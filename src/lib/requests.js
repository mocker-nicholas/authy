import axios from "axios";

const baseUrl = "http://localhost:8080/api";
// const devUrl = "http://localhost:8080/api";
// prod url = https://authnetserver.herokuapp.com/api

export const request = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

export const generateTransaction = async () => {
  const response = await request.post("/transaction/generate");
  return response;
};

export const getTransactionById = async (id) => {
  const response = await request.get(`/transaction/${id}`);
  return response;
};

export const voidTransaction = async (id) => {
  const response = await request.post(`/transaction/${id}/void`);
  return response;
};

export const refundTransaction = async (body) => {
  const response = await request.post(`/transaction/${body.id}/refund`, {
    ...body,
  });
  return response;
};

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

export const createCustomer = async (body) => {
  const response = await request.post("/customer/create", { ...body });
  return response;
};

export const getCustomers = async (body) => {
  const response = await request.get("/customer");
  return response;
};

export const getACustomer = async (id) => {
  const response = await request.get(`/customer/${id}`);
  return response;
};

export const chargeCustomer = async (body) => {
  const response = await request.post(`/customer/${body.id}/charge`, {
    ...body,
  });
  return response;
};

export const getInvoices = async () => {
  const response = await request.get("/invoice");
  return response;
};

export const getInvoiceById = async (id) => {
  const response = await request.get(`/invoice/${id}`);
  return response;
};

export const deleteInvoice = async (id) => {
  const response = await request.delete(`/invoice/${id}`);
  return response;
};

export const createInvoice = async (body) => {
  const response = await request.post("/invoice/create", { ...body });
  return response;
};

export const markAsPaid = async (id) => {
  const response = await request.post(`/invoice/paid/${id}`);
  return response;
};
