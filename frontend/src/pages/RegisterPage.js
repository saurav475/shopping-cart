import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useCommon';
import Alert from '../components/Alert';
import '../styles/auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [alert, setAlert] = useState(null);

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    async (formData) => {
      if (formData.password !== formData.confirmPassword) {
        setAlert({ type: 'danger', message: 'Passwords do not match' });
        return;
      }

      try {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        navigate('/');
      } catch (err) {
        setAlert({ type: 'danger', message: err.response?.data?.message || 'Registration failed' });
      }
    }
  );

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form card">
          <div className="card-header">
            <h2>Register</h2>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={values.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>

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

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={values.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="card-footer text-center">
            Already have an account?{' '}
            <a href="/login" className="link">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
