// frontend/src/Login.js
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B5320', 
    },
  },
});

export default function Login() {
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        const role = data.get('role');

        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password,role })
            });
            const result = await response.json();

            if (response.ok) {
                if (result.role === 'Moniteur') {
                    window.location.href = "/dashboard";
                } else if (result.role === 'Administrateur') {
                    window.location.href = "/DashboardAdmin";
                }
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main">
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundColor: '#4B5320',
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Armoiries_Forces_arm%C3%A9es_tunisiennes.svg/640px-Armoiries_Forces_arm%C3%A9es_tunisiennes.svg.png)', 
              backgroundRepeat: 'no-repeat',
              backgroundSize: '70%',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 11,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#4B5320' }}> 
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Se connecter
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nom d'utilisateur"
                  name="username"
                  autoComplete="username"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox checked={role === 'Moniteur'} onChange={handleRoleChange} value="Moniteur" color="primary" />}
                  label="Moniteur"
                />
                <FormControlLabel
                  control={<Checkbox checked={role === 'Administrateur'} onChange={handleRoleChange} value="Administrateur" color="primary" />}
                  label="Administrateur"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                {error && <Typography color="error">{error}</Typography>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}
