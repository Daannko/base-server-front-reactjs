import axiosInstance from "../interceptors/AuthInterceptor"; // assuming axiosInstance is configured

const GoogleLogin = ({scopes}) => {

  const handleGoogleLogin = async () => {
    try {
      // Make a request to your backend to get the OAuth URL
      debugger;
      const response = await axiosInstance.post("http://localhost:8080/google/auth",{scopes:scopes,code:null});
      // The backend should return a URL in the response body
      const  redirectUrl  = response.data;

      // If the URL exists, open it in a new window
      if (redirectUrl) {
        const googleLoginWindow = window.open(redirectUrl, "Google Login", "width=600,height=600");

        // Poll the window to check if it's closed and reload the main window
        
        if(googleLoginWindow){
            const interval = setInterval(() => {
                if (googleLoginWindow.closed) {
                  clearInterval(interval);
                  window.location.reload();
                }
              }, 1000);
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} id="google-signin-button">
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
