import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sessionId');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao App
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default Home;
