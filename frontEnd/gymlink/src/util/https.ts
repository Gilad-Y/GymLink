import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create Axios instance
const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Replace with your API base URL
  timeout: 10000,
});

// Request interceptor
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Optionally add headers, e.g., Authorization
    // config.headers['Authorization'] = `Bearer ${token}`;

    // console.log("Request Config:", config); // Optional: for debugging purposes
    return config;
  },
  (error) => {
    // console.error("Request error:", error); // Log request error
    return Promise.reject(error); // Ensure errors are passed to the next handler
  }
);

// Response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Optionally handle response data before passing it on
    // console.log("Response:", response); // Optional: for debugging purposes
    return response;
  },
  (error) => {
    // Handle error based on response status code
    if (error.response) {
      // Server responded with a status code outside of 2xx
      // console.error("Response error:", error.response.data); // Log server response
    } else if (error.request) {
      // No response received from server
      // console.error("No response received:", error.request);
    } else {
      // Something else triggered the error (e.g., setup)
      // console.error("Request setup error:", error.message);
    }

    return Promise.reject(error); // Return error to be handled later
  }
);

export default http;
