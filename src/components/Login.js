import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3001/api/login', user);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId);
    localStorage.setItem('isAuth', res.data.isAuth);
    navigate('/home');
  };

  return (
    <div>
      <label>Email</label>
      <input type="text" name="email" onChange={handleChange} />
      <label>Password</label>
      <input type="password" name="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
