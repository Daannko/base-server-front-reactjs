import React, { useEffect } from 'react';
import axiosInstance from '../../interceptors/AuthInterceptor'; // Assuming you have axios instance exported from another file
import styles from './GoogleCallbackRedirect.module.css'
const GoogleCallbackRedirect = () => {
  useEffect(() => {
    const getTokens = async () => {
      try {
        // Send request to the backend to exchange the code for tokens
        const response = await axiosInstance.get('http://localhost:8080/google/callback', {
          params: {
            code: new URLSearchParams(window.location.search).get('code'), // Extract code from the URL
          },
        });

        console.log('Response from backend:', response.data);
        window.close(); // Close the OAuth window
        } catch (error) {
        console.error('Error during callback processing:', error);
      }
    };

    // Call the function to get the tokens
    getTokens();
  }, []);

  return (
    <div className={styles.center}>
      <h2>Redirecting...</h2>
      <p>Please wait while we redirect you.</p>
    </div>
  );
};

export default GoogleCallbackRedirect;