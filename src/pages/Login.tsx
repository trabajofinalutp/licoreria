import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setUser, getUser } from '../types/Usuario';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUser();
    if (userData?.token) {
      try {
        const decodedToken: any = jwtDecode(userData.token);
        // Check if token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(userData);
          navigate('/');
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/authenticate', null, {
        params: { correo, password }
      });
      const { token } = response.data;
      const decodedToken: any = jwtDecode(token);
      const { role, sub: email } = decodedToken;
      
      const userData = { token, role, email };
      setUser(userData);
      console.log('Logged in as:', role);
      console.log('token:', token);
      setError('');
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Correo:</label>
          <input
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;