import React, { useState } from 'react';
import { loginUser } from '../services/api';

let Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    localStorage.setItem('token', res.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' onChange={e => setEmail(e.target.value)} />
      <input type='password' onChange={e => setPassword(e.target.value)} />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;