import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://backend/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('sessionId', JSON.stringify({ token: data.token }));
        navigate('/home');
      } else {
        const error = await response.json();
        setResponseMessage(error.message || 'Erro no login');
        setError(true);
      }
    } catch (err) {
      setResponseMessage('Erro de conexão');
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Usuário"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
          </Box>

          {responseMessage && (
            <Alert severity={error ? 'error' : 'success'} sx={{ mt: 2 }}>
              {responseMessage}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
