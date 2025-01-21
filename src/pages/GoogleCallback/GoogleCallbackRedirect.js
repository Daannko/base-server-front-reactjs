import React, { useEffect } from 'react';
import axiosInstance from '../../interceptors/AuthInterceptor'; // Assuming you have axios instance exported from another file
import styles from './GoogleCallbackRedirect.module.css'
const GoogleCallbackRedirect = () => {
  useEffect(() => {
    const sendGoogleOAuth2Code = async () => {
      try {
        // Send request to the backend to exchange the code for tokens
        const code = new URLSearchParams(window.location.search).get('code'); 
        const scopes = new URLSearchParams(window.location.search).get('scope').split(" "); 
        debugger// Extract the code from the URL
        // Prepare the request body with code and scopes
        const requestBody = {
          code,
          scopes // Add the scopes array to the body
        };
    
        const response = await axiosInstance.post('http://localhost:8080/google/callback', requestBody);
        console.log('Response from backend:', response.data);
        window.close(); // Close the OAuth window
        } catch (error) {
        console.error('Error during callback processing:', error);
      }
    };

    // Call the function to get the tokens
    sendGoogleOAuth2Code();
  }, []);

  return (
    <div className={styles.center}>
      <h2>Redirecting...</h2>
      <p>Please wait while we redirect you.</p>
    </div>
  );
};

export default GoogleCallbackRedirect;