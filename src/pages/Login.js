import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link'; 
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

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const username = data.get('username');
      const password = data.get('password');
      
      if (role === 'Moniteur') {
        console.log({ username, password, role });
        window.location.href = "/dashboard";
      } else if (role === 'Administrateur') {
        console.log({ username, password, role });
        window.location.href = "/DashboardAdmin";
      } else {
        console.error("Rôle non valide !");
      }
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" >
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
          <Grid item xs={13} sm={9} md={5} component={Paper} elevation={8} square>
            <Box
              sx={{
                my: 10.5,
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
                  Mot de passe oublier? 
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}
