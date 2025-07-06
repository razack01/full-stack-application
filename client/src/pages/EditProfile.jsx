import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [userID, setUserID] = useState(null);

  // Decode token and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserID(decoded.userID);

      // Fetch user profile
      axios.get(`http://localhost:4000/api/users/getloggedusers/${decoded.userID}`)
        .then(res => {
          const { name, email } = res.data;
          setFormData(prev => ({ ...prev, name, email }));
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to load profile');
        });
    } catch (err) {
      console.error('Invalid token');
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/users/updateloggedusers/${userID}`, formData);
      toast.success('Profile updated successfully!');
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      toast.error('Update failed.');
    }
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ width: '400px' }}>
        <div className="card-body">
          <div className="edit-profile">
  <button
    className="btn btn-link"
    onClick={goBack}
    style={{ textDecoration: "none" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
      />
    </svg>
  </button>
  <h3 className="mb-0">Edit Profile</h3>
</div>


          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
