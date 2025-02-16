import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    // Check if the access token is in the URL after redirect
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token') as any;

      // Send the token to the backend using axios
      axios.post('http://localhost:5000/auth/callback', {
        accessToken: token
      })
      .then(response => {
         // Extract and store the details in localStorage
         const email = response.data.user.email;
         const firstName = response.data.user.firstName
         const lastName = response.data.user.lastName
         const role = response.data.user.role
 
         localStorage.setItem('accessToken', token);
         localStorage.setItem('email', email);
         localStorage.setItem('firstName', firstName);
         localStorage.setItem('lastName', lastName);
         localStorage.setItem('role', role);
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
