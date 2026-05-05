import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useCommon';
import Alert from '../components/Alert';
import '../styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [alert, setAlert] = useState(null);

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (formData) => {
      try {
        await login(formData.email, formData.password);
        navigate('/');
      } catch (err) {
        setAlert({ type: 'danger', message: err.response?.data?.message || 'Login failed' });
      }
    }
  );

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form card">
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={values.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="card-footer text-center">
            Don't have an account?{' '}
            <a href="/register" className="link">
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
