import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useCommon';
import Alert from '../components/Alert';
import '../styles/pages.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [alert, setAlert] = useState(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      name: user?.name || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      postalCode: user?.address?.postalCode || '',
      country: user?.address?.country || '',
    },
    async (formData) => {
      try {
        await updateProfile({
          name: formData.name,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        });
        setAlert({ type: 'success', message: 'Profile updated successfully!' });
      } catch (err) {
        setAlert({ type: 'danger', message: err.response?.data?.message || 'Update failed' });
      }
    }
  );

  if (!isAuthenticated) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        <div className="profile-container">
          <div className="card mt">
            <div className="card-header">
              <h3>Account Information</h3>
            </div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={user?.email || ''} disabled />
                <small className="text-muted">Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label className="form-label">Name</label>
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
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>

              <h3 className="mt-2">Shipping Address</h3>

              <div className="form-group">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={values.street}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-2 gap-2">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={values.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={values.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-2 gap-2">
                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    value={values.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={values.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg mt"
                disabled={isSubmitting}
                style={{ minWidth: '200px' }}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
