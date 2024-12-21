import axios from 'axios';

// Create an Axios instance




// src/axiosInstance.js

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Replace with your backend URL
});

// Add request interceptor to automatically set withCredentials to true
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
//   (error) => {
//     return Promise.reject(error);
//   }
);

export default axiosInstance;











// Refresh token flag to prevent multiple simultaneous refresh attempts
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });
//   failedQueue = [];
// };

// // Axios interceptor for handling errors and token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     // Check if the error is an authentication error (401 or 462)
//     if (
//       (error.response && (error.response.status === 401 || error.response.status === 462)) &&
//       !originalRequest._retry
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           // Add to the queue to wait for the refresh token request
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           // Retry the original request with the refreshed token
//           return axiosInstance(originalRequest);
//         }).catch((err) => {
//           return Promise.reject(err);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       // Attempt to refresh the token by making a refresh API call
//       return axiosInstance
//         .post('/auth/refresh')  // Replace with your backend refresh token endpoint
//         .then((response) => {
//           // The backend should send the new token in the response
//           // Since the backend sets the token in cookies, no need to manually set headers

//           // Process the failed requests that were queued

//           return axiosInstance(originalRequest);  // Retry the original request
//         })
//         .catch((err) => {
//           processQueue(err, null);  // Reject all failed requests if refresh fails
//           return Promise.reject(err);  // Reject the error
//         })
//         .finally(() => {
//           isRefreshing = false;
//         });
//     }

//     return Promise.reject(error);  // Return any other errors
//   }
// );