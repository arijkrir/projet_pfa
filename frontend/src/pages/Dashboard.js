import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const initialAbsentTireurs = [
  { image: 'url_de_l_image', firstName: 'ali', lastName: 'mabrouk', groupe: 1 },
  { image: 'url_de_l_image', firstName: 'Ahmed', lastName: 'Maalel', groupe: 2 },
];

function TireursTable({ tireurs }) {
  return (
    <TableContainer component={Paper}>
        
      <Table aria-label="tireurs table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Groupe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tireurs.map((tireur, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Avatar alt={`${tireur.firstName} ${tireur.lastName}`} src={tireur.image} />
              </TableCell>
              <TableCell align="left">{tireur.firstName}</TableCell>
              <TableCell align="left">{tireur.lastName}</TableCell>
              <TableCell align="left">{tireur.groupe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [openPopup, setOpenPopup] = useState(false);
  const [absentTireurs, setAbsentTireurs] = useState(initialAbsentTireurs);

  const handleSidebarClick = (page) => {
    if (page === 'Dashboard') {
      window.location.href = './Dashboard';
    } else {
      setCurrentPage(page);
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleConfirmAddTireur = () => {
    // Récupérer les valeurs des champs de la popup
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const groupe = document.getElementById('groupe').value;

    if (name && lastName && groupe) {
      const newTireur = {
        firstName: name,
        lastName: lastName,
        groupe: parseInt(groupe),
      };

      setAbsentTireurs([...absentTireurs, newTireur]);

      handleClosePopup();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
  <Box>
    <Navbar/>
    <Sidebar/>
    <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, p: 3, marginLeft: '240px',marginTop:'-10px' }} onSidebarClick={handleSidebarClick}>
      {/* Charts */}
      <Box sx={{ width: '60%', mr: 2 }}>
        {/* Pie Chart */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 9.5 }}>
              Total Groups and Tireurs
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={dataPieChart}
                  outerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {dataPieChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </Box>

      {/* List of Absent Tireurs */}
      <Box sx={{ width: '60%' }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                List of Absent Tireurs
              </Typography>
              <IconButton onClick={handleOpenPopup}>
                <AddIcon />
              </IconButton>
            </Box>
            <TireursTable tireurs={absentTireurs} />
          </CardContent>
        </Card>
      </Box>

      {/* Popup for Adding a Tireur */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Add Absent Tireur</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Name" fullWidth />
          <TextField margin="dense" id="lastName" label="Last Name" fullWidth />
          <TextField margin="dense" id="groupe" label="Groupe" type="number" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <Button onClick={handleConfirmAddTireur}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
}

// Données pour les charts
const dataPieChart = [
  { name: 'Groups', value: 4 },
  { name: 'Tireurs', value: 150 },
];

export default Dashboard;
