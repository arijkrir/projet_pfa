import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import du ThemeProvider et createTheme
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B5320', // Vert militaire
    },
  },
});

function ShootingOrder() {
  const initialShooters = [
    { id: 1, firstName: 'ali', lastName: 'mm', grade: 'Sergent', group: 'Groupe 1', hasShot: false },
    { id: 2, firstName: 'yassin', lastName: 'ch', grade: 'Capitaine', group: 'Groupe 1', hasShot: false },
    { id: 3, firstName: 'ahmed', lastName: 'gh', grade: 'Lieutenant', group: 'Groupe 2', hasShot: false },
    { id: 4, firstName: 'afif', lastName: 'kr', grade: 'Caporal', group: 'Groupe 2', hasShot: false },
    { id: 5, firstName: 'omar', lastName: 'mch', grade: 'Colonel', group: 'Groupe 3', hasShot: false },
    { id: 6, firstName: 'achraf', lastName: 'gha', grade: 'Sergent', group: 'Groupe 3', hasShot: false },
    { id: 7, firstName: 'seif', lastName: 'tr', grade: 'Caporal', group: 'Groupe 4', hasShot: false },
    { id: 8, firstName: 'sarah', lastName: 'youss', grade: 'Lieutenant', group: 'Groupe 4', hasShot: false },
  ];

  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedShooters, setSelectedShooters] = useState([]);
  const [shooters, setShooters] = useState(initialShooters);
  const [open, setOpen] = useState(false);
  const [currentShooter, setCurrentShooter] = useState(null);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleManageShooters = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectShooters = () => {
    const selected = shooters.filter(
      (shooter) => shooter.group === selectedGroup
    );
    setSelectedShooters(selected);
  };

  const handleEditShooter = (shooter) => {
    setCurrentShooter(shooter);
    setOpen(true);
  };

  const handleDeleteShooter = (shooterId) => {
    setShooters((prevShooters) =>
      prevShooters.filter((shooter) => shooter.id !== shooterId)
    );
    handleClose();
  };

  const handleSaveShooter = () => {
    handleClose();
  };

  const organizeShootingOrder = () => {
    const shootingOrder = [...selectedShooters];
    shootingOrder.sort(() => Math.random() - 0.5);
    setSelectedShooters(shootingOrder);
  };

  const handleViewShooterDetails = (shooterId) => {
    // Rediriger vers une autre page pour visualiser les tirs et enregistrer les notes
    window.location.href = `/shooter/${shooterId}`;
  };

  return (
    <ThemeProvider theme={theme}> 
      <Box>
        <Navbar />
        <Sidebar />
        <div style={{ padding: '10px', marginTop: '10px', textAlign: 'center', marginLeft: '250px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: 20, display: "flex", justifyContent: "space-between", flexWrap: "nowrap", flexDirection: "row" }}>
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel id="Group-select-label" sx={{ color: 'white' }}>Groupe</InputLabel>
                  <Select
                    labelId="group-select-label"
                    id="group-select"
                    value={selectedGroup}
                    onChange={handleGroupChange}
                  >
                    <MenuItem value="">Sélectionner un groupe</MenuItem>
                    {Array.from(new Set(shooters.map((shooter) => shooter.group))).map(
                      (group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSelectShooters}
                  disabled={!selectedGroup}
                  sx={{ bgcolor: "#4B5320"}}
                >
                  Organiser les tirs
                </Button>
                <IconButton
                  onClick={handleManageShooters}
                  disabled={!selectedGroup}
                  sx={{ bgcolor: "#4B5320", color: "white",  width: "50px", height: "50px" }}
                >
                  <AddIcon />
                </IconButton>
              </Paper>
            </Grid>
            {selectedShooters.length > 0 && (
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: 20 }}>
                  <Typography variant="h5" gutterBottom style={{ color: '#4B5320' }}>
                    Liste des tireurs du groupe "{selectedGroup}"
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Prénom</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Grade</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedShooters.map((shooter, index) => (
                          <TableRow key={shooter.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{shooter.firstName}</TableCell>
                            <TableCell>{shooter.lastName}</TableCell>
                            <TableCell>{shooter.grade}</TableCell>
                            <TableCell>
                              {/* Remplacement du bouton "Modifier" par un bouton pour visualiser les détails */}
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleViewShooterDetails(shooter.id)}
                                style={{ color: '#4B5320', borderColor: '#4B5320' }}
                              >
                                Visualiser les détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            )}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{  color: '#4B5320' }}>
                {currentShooter ? 'Modifier un tireur' : 'Ajouter un nouveau tireur'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {currentShooter ? 'Modifiez les détails du tireur' : 'Saisissez les détails du nouveau tireur'}
                </DialogContentText>
                <FormGroup>
                  <FormControl margin="normal">
                    <InputLabel style={{ color: '#4B5320' }}>Prénom</InputLabel>
                    <Input
                      value={''}
                      onChange={(e) =>
                        setCurrentShooter({
                          ...currentShooter,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl margin="normal">
                    <InputLabel style={{ color: '#4B5320' }}>Nom</InputLabel>
                    <Input
                      value={''}
                      onChange={(e) =>
                        setCurrentShooter({
                          ...currentShooter,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl margin="normal">
                    <InputLabel style={{ color: '#4B5320' }}>Grade</InputLabel>
                    <Input
                      value={''}
                      onChange={(e) =>
                        setCurrentShooter({
                          ...currentShooter,
                          grade: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </FormGroup>
              </DialogContent>
              <DialogActions>
                {currentShooter && (
                  <Button
                    onClick={() => handleDeleteShooter(currentShooter.id)}
                    color="secondary"
                    style={{ color: '#4B5320' }}
                  >
                    Supprimer
                  </Button>
                )}
                <Button onClick={handleClose} color="primary" style={{ color: '#4B5320' }}>
                  Annuler
                </Button>
                <Button onClick={handleSaveShooter} color="primary" style={{ color: '#4B5320' }}>
                  Enregistrer
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default ShootingOrder;
