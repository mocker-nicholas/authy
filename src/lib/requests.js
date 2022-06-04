import axios from "axios"

const baseUrl = "http://localhost:8080/api"

export const request = axios.create({
  withCredentials: true,
  baseURL: baseUrl
})

export const searchUnsettled = async (body) => {
  const response = await request.post("/transaction/search", {
    ...body
  });
  const data = response.data;
  return data;
}