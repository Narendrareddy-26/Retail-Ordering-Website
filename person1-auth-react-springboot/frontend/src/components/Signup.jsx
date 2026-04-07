import React, { useState } from 'react';
import { authService } from '../services/authService';
import '../styles/Auth.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordReqs, setPasswordReqs] = useState({
    length: false,
    upper: false,
    number: false,
    special: false
  });

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });

    // Check password requirements
    setPasswordReqs({
      length: pwd.length >= 6,
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      setError('❌ You must accept the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      setSuccess(`✅ ${response.data.message} Welcome, ${response.data.user.name}`);

      // Store auth data
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Clear form and show success message
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
      });
      setTermsAccepted(false);
      
      // Stay on signup page - no redirect to dashboard
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || 'Signup failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box auth-box-large">
        <div className="auth-header">
          <h1>📝 Sign Up</h1>
          <p>Create your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">👤 Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">📧 Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔑 Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              placeholder="Enter a strong password"
              required
            />
            <div className="password-requirements">
              <div className={`requirement ${passwordReqs.length ? 'valid' : 'invalid'}`}>
                At least 6 characters
              </div>
              <div className={`requirement ${passwordReqs.upper ? 'valid' : 'invalid'}`}>
                Contains uppercase letter
              </div>
              <div className={`requirement ${passwordReqs.number ? 'valid' : 'invalid'}`}>
                Contains a number
              </div>
              <div className={`requirement ${passwordReqs.special ? 'valid' : 'invalid'}`}>
                Contains special character
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">🔑 Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Account Type:</label>
            <div className="role-selector">
              <div className="role-option">
                <input
                  type="radio"
                  id="roleUser"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                />
                <label htmlFor="roleUser">👤 User</label>
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  id="roleAdmin"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                />
                <label htmlFor="roleAdmin">👨‍💼 Admin</label>
              </div>
            </div>
            <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
              Select "Admin" if you want admin privileges (must be verified)
            </small>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
