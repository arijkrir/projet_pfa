import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';


function Sidebar({ onSidebarClick }) {
  const [selectedItem, setSelectedItem] = React.useState(window.location.pathname);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onSidebarClick) {
      onSidebarClick(item);
    }
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
      <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Armoiries_Forces_arm%C3%A9es_tunisiennes.svg/640px-Armoiries_Forces_arm%C3%A9es_tunisiennes.svg.png'} style={{ width: 150, height: 150, marginBottom: '26px', marginTop: "5px" }} />
      <List>
        {['Tableau de bord', 'Tireurs', 'Organisation des tirs','Calendrier', 'Déconnexion'].map((text, index) => (
          <Link to={text === 'Tableau de bord' ? '/dashboard' : text === 'Tireurs' ? '/tireurs' : text === 'Organisation des tirs' ? '/organisation-tirs' : text === 'Calendrier' ? '/Calendrier' : '/'} style={{ textDecoration: 'none', color: 'inherit', marginBottom: '8px' }} key={text}>
            <ListItem
              button
              sx={{
                bgcolor: selectedItem === (text === 'Tableau de bord' ? '/dashboard' : text === 'Tireurs' ? '/tireurs' : text === 'Organisation des tirs' ? '/organisation-tirs' : text === 'Calendrier' ? '/Calendrier' : '/') ? '#4B5320' : 'background.paper',
              }}
              onClick={() => handleItemClick(text)}
              style={{ marginBottom: '15px' }} 
            >
              <ListItemIcon sx={{ color: selectedItem === (text === 'Tableau de bord' ? '/dashboard' : text === 'Tireurs' ? '/tireurs' : text === 'Organisation des tirs' ? '/organisation-tirs' : text === 'Calendrier' ? '/Calendrier' : '/') ? 'primary.contrastText' : 'inherit' }}>
                {text === 'Tableau de bord' && <DashboardIcon />}
                {text === 'Tireurs' && <PeopleAltIcon />}
                {text === 'Organisation des tirs' && <EventIcon />}
                {text === 'Calendrier' && <EventIcon />}
                {text === 'Déconnexion' && <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: selectedItem === (text === 'Tableau de bord' ? '/dashboard' : text === 'Tireurs' ? '/tireurs' : text === 'Organisation des tirs' ? '/organisation-tirs' : text === 'Calendrier' ? '/Calendrier' : '/') ? 'primary.contrastText' : 'inherit' }} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
