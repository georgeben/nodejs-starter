/**
 * @module lib/httpClient
 * @description HTTP Client module for making HTTP requests to external services
 */
import axios from "axios";

const httpClient = axios.create({
  timeout: 120000, // 2 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => response.data,
);

export default httpClient;
