import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Layout/Navbar';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="protected-content">
        <h2>Protected Content</h2>
        <p>This is your protected content.</p>
      </div>
    </>
  );
}

export default ProtectedPage;
