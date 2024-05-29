import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box, Grid } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfile = () => {
    navigate('/Profil');
    console.log("profile");
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static" sx={{ backgroundColor: '#4B5320', marginTop:"0px" , marginRight:"30px",height:"70px" }}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ marginLeft:"250px" }}>
                  {new Date().toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    placeholder="Rechercher..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ color: 'white' }} 
                  />
                  <IconButton color="inherit">
                    
                  </IconButton>
                  <div onClick={handleProfile}>
                    <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
