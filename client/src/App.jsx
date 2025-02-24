import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedPage from './Protected';
import HomePage from './HomePage'; 
import VideoStream from './Stream/VideoStream';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<div>Events</div>} />
          <Route path="/rankings" element={<div>Rankings</div>} />
          <Route path="/athletes" element={<div>Athletes</div>} />
          <Route path="/news" element={<div>News</div>} />
          <Route path="/watch" element={<VideoStream />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
