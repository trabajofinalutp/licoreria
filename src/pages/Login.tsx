import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setUser, getUser } from '../types/Usuario';
import { Layout } from 'antd';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const { Content } = Layout;

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUser();
    if (userData?.token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8083/authenticate', null, {
        params: { correo, password }
      });
      const { token } = response.data;
      const decodedToken: any = jwtDecode(token);
      const { role, sub: email } = decodedToken;
      
      const userData = { token, role, email };
      setUser(userData);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Box sx={{ width: '100%' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                background: '#fff',
                textAlign: 'center'
              }}
            >
              <Typography component="h1" variant="h4" sx={{ mb: 4, color: '#001529', fontWeight: 'bold' }}>
                Gestión de Bodega
              </Typography>
              <Typography component="h2" variant="h5" sx={{ mb: 3, color: '#666' }}>
                Iniciar Sesión
              </Typography>
              
              <form onSubmit={handleLogin}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                {error && (
                  <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                    {error}
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    height: '48px',
                    backgroundColor: '#001529',
                    '&:hover': {
                      backgroundColor: '#002140'
                    }
                  }}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                </Button>
              </form>
            </Paper>
          </Box>
        </Container>
      </Content>
    </Layout>
  );
};

export default Login;