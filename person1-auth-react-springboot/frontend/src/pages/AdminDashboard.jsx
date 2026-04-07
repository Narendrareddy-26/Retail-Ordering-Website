import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../styles/Dashboard.css';

function AdminDashboard() {
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
        
        // Check if user is admin
        if (response.data.user.role !== 'admin') {
          navigate('/user-dashboard');
          return;
        }

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
        <h1>👨‍💼 Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {user && (
          <div className="admin-card">
            <h2>Welcome, Admin {user.name}!</h2>
            <div className="user-details">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> <span className="badge admin">{user.role}</span></p>
              <p><strong>User ID:</strong> {user.id}</p>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>📊 Admin Features</h3>
          <ul>
            <li>✓ Manage users and permissions</li>
            <li>✓ View all orders</li>
            <li>✓ Generate reports</li>
            <li>✓ Configure system settings</li>
            <li>✓ Monitor system health</li>
            <li>✓ Manage inventory</li>
          </ul>
        </div>

        <div className="info-section">
          <h3>🔐 Admin Actions</h3>
          <div className="actions">
            <button className="action-btn">Manage Users</button>
            <button className="action-btn">View Reports</button>
            <button className="action-btn">System Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
