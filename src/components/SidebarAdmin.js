import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import ChatIcon from '@mui/icons-material/Chat';
import BarChartIcon from '@mui/icons-material/BarChart'; 
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';

function SidebarAdmin({ onSidebarClick }) {
  const [selectedItem, setSelectedItem] = React.useState(window.location.pathname);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onSidebarClick) {
      onSidebarClick(item);
    }
  };

  const handleLogout = () => {
    // Redirection vers la page de connexion lors de la déconnexion
    window.location.href = '/login';
  };

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <img src={'./Armoiries_Forces_armées_tunisiennes.svg.png'} alt="University Logo" style={{ width: 150, height: 150, marginBottom: '26px', marginTop: "5px" }} />
      <List>
        <Link to="/DashboardAdmin" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '8px' }}>
          <ListItem
            button
            sx={{
              bgcolor: selectedItem === '/DashboardAdmin' ? '#4B5320' : 'background.paper',
            }}
            onClick={() => handleItemClick('/DashboardAdmin')}
            style={{ marginBottom: '12px' }}
          >
            <ListItemIcon sx={{ color: selectedItem === '/DashboardAdmin' ? 'primary.contrastText' : 'inherit' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" sx={{ color: selectedItem === '/DashboardAdmin' ? 'primary.contrastText' : 'inherit' }} />
          </ListItem>
        </Link>
        <Link to="/agenda" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '8px' }}>
          <ListItem
            button
            sx={{
              bgcolor: selectedItem === '/agenda' ? '#4B5320' : 'background.paper',
            }}
            onClick={() => handleItemClick('/agenda')}
            style={{ marginBottom: '12px' }}
          >
            <ListItemIcon sx={{ color: selectedItem === '/agenda' ? 'primary.contrastText' : 'inherit' }}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Agenda" sx={{ color: selectedItem === '/agenda' ? 'primary.contrastText' : 'inherit' }} />
          </ListItem>
        </Link>
        <Link to="/groupes" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '8px' }}>
          <ListItem
            button
            sx={{
              bgcolor: selectedItem === '/groupes' ? '#4B5320' : 'background.paper',
            }}
            onClick={() => handleItemClick('/groupes')}
            style={{ marginBottom: '12px' }}
          >
            <ListItemIcon sx={{ color: selectedItem === '/groupes' ? 'primary.contrastText' : 'inherit' }}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Groupes" sx={{ color: selectedItem === '/groupes' ? 'primary.contrastText' : 'inherit' }} />
          </ListItem>
        </Link>
        <Link to="/scores" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '8px' }}>
          <ListItem
            button
            sx={{
              bgcolor: selectedItem === '/scores' ? '#4B5320' : 'background.paper',
            }}
            onClick={() => handleItemClick('/scores')}
            style={{ marginBottom: '12px' }}
          >
            <ListItemIcon sx={{ color: selectedItem === '/scores' ? 'primary.contrastText' : 'inherit' }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Scores" sx={{ color: selectedItem === '/scores' ? 'primary.contrastText' : 'inherit' }} />
          </ListItem>
        </Link>
        <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Déconnexion" />
      </ListItem>
      </List>
      {/* Bouton de déconnexion */}
      
    </Box>
  );
}

export default SidebarAdmin;
