import axios from "axios"

const baseUrl = "http://localhost:8080/api"

export const request = axios.create({
  withCredentials: true,
  baseURL: baseUrl
})

