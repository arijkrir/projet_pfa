import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const defaultTheme = createTheme();

export default function UserProfile() {
  const [userData, setUserData] = useLocalStorage('userData', {
    firstName: 'Yassine',
    lastName: 'Chaaben',
    phoneNumber: '99234167',
    program: 'FI-A2-GL',
    group: 'Group 4',
    password: 'password123', 
  });

  const [avatarFile, setAvatarFile] = useLocalStorage('avatarFile', null);

  const [editingField, setEditingField] = React.useState(null);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleEdit = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleSave = () => {
    setEditingField(null);
    // Sauvegarder les modifications
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(URL.createObjectURL(file));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Sidebar/>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            marginRight:"60px",
            marginLeft:"260px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-file"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-file">
            <Avatar
              src={avatarFile ? avatarFile : "/path/to/user/image.jpg"}
              alt="User Image"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </label>
          <Box component="form" noValidate sx={{ mt: 0 }}>
            <TextField
              margin="normal" 
              fullWidth
              disabled={editingField !== 'firstName'}
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={userData.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal" 
              fullWidth
              disabled={editingField !== 'lastName'}
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal" 
              fullWidth
              disabled={editingField !== 'phoneNumber'}
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4B5320', 
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4B5320', 
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleEdit('phoneNumber')}>
                    <EditIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal" 
              fullWidth
              disabled={editingField !== 'password'}
              id="password"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={userData.password}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4B5320', 
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4B5320', 
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ 
                mt: 2, 
                mb: 1, 
                backgroundColor: '#4B5320',
                '&:hover': { backgroundColor: '#4B5320' },
                width: '250px', 
                marginLeft: '160px',
              }} 
              onClick={handleSave}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
