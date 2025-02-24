import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Layout/Navbar';
import Payment from './Payment';
import Footer from './Layout/footer';


function HomePage() {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if token doesn't exist
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/protected'); // Navigate to /protected if token verification fails
      }
    };

    verifyToken();
  }, [navigate]);

  const handleSubscribeClick = () => {
    setShowPayment(prevState => !prevState); // Toggle payment visibility
  };

  return (
    <>
      <NavBar />
      <div className="protected-content">
        <h2>Protected Content</h2>
        <p>This is your protected content.</p>
        
        {/* Toggle button to show/hide Payment component */}
        <div className="container">
          <button 
            onClick={handleSubscribeClick} 
            className="subscribe-button"
          >
            {showPayment ? 'Close' : 'Subscribe'}
          </button>
        </div>

        {/* Display the Payment component only when showPayment is true */}
        {showPayment && <Payment />}
      </div>
      <Footer />
    </>

  );
}

export default HomePage;
