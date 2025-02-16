import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function App() {
  useEffect(() => {
    // Check if the access token is in the URL after redirect
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token') as any;
      console.log('Token:', token);

      // Send the token to the backend using axios
      axios.post('http://localhost:5000/auth/callback', {
        accessToken: token
      })
      .then(response => {
        console.log('Backend Response:', response.data);

        // Save the token in localStorage
        localStorage.setItem('accessToken', token);
        const decodedToken = jwtDecode(token) as any;
         // Extract and store the details in localStorage
         const userEmail = decodedToken.email;
         const fullName = decodedToken.user_metadata.full_name || 'Unknown';
         const firstName = fullName.split(' ')[0];
         const lastName = fullName.split(' ')[1] || '';
 
         localStorage.setItem('accessToken', token);
         localStorage.setItem('userEmail', userEmail);
         localStorage.setItem('firstName', firstName);
         localStorage.setItem('lastName', lastName);

        // Clear the URL and redirect to the home page
        window.location.href = "/";
      })
      .catch(error => {
        console.error('Error sending token to backend:', error);
      });
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  }

  return (
    <>
      <button onClick={handleLogin}>Login with Google</button>
    </>
  );
}

export default App;
