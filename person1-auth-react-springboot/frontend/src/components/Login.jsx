import React, { useState } from 'react';
import { authService } from '../services/authService';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.login(email, password, role);
      
      setSuccess(`✅ Login successful! Welcome, ${response.data.user.name}`);
      
      // Store auth data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Clear form and show success message
      setEmail('');
      setPassword('');
      
      // Stay on login page - no redirect to dashboard
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || 'Login failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🔐 Login</h1>
          <p>Retail Ordering System</p>
        </div>

        <div className="info-box">
          <strong>Demo Credentials:</strong><br />
          User: user@example.com / pwd123<br />
          Admin: admin@example.com / admin123
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Role:</label>
            <div className="role-selector">
              <div className="role-option">
                <input
                  type="radio"
                  id="roleUser"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="roleUser">👤 User</label>
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  id="roleAdmin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor="roleAdmin">👨‍💼 Admin</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">📧 Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔑 Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
