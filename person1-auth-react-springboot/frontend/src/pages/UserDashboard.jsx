import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../styles/Dashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await authService.getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.error('Error loading profile:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👤 User Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {user && (
          <div className="user-card">
            <h2>Welcome, {user.name}!</h2>
            <div className="user-details">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> <span className="badge">{user.role}</span></p>
              <p><strong>User ID:</strong> {user.id}</p>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>📋 User Features</h3>
          <ul>
            <li>✓ View and manage your profile</li>
            <li>✓ Place orders in the retail system</li>
            <li>✓ Track order history</li>
            <li>✓ Manage account settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
