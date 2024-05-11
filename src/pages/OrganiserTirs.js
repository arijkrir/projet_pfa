import React, { useState } from 'react';
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
import { green } from '@mui/material/colors';
import { Add as AddIcon } from '@mui/icons-material'; 
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';


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

  // Function to handle group selection 
  //Cette fonction est appelée lorsqu'il y a un changement dans la sélection d'un groupe.
  // Elle récupère la nouvelle valeur sélectionnée et la stocke dans un état (selectedGroup)
  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  //  dialog pour modifier tireurs
  //Cette fonction ouvre un dialogue ou une boîte de dialogue pour gérer les tireurs.
  // Elle met à jour l'état pour indiquer que la boîte de dialogue est ouverte (open)
  const handleManageShooters = () => {
    setOpen(true);
  };

  // dialog
  //Cette fonction ferme la boîte de dialogue. 
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle selecting shooters from the selected group
  //Cette fonction est responsable de la sélection des tireurs à partir d'un groupe spécifique. 
  //Elle filtre les tireurs en fonction du groupe sélectionné puis met à jour l'état pour stocker les tireurs sélectionnés (selectedShooters).
  const handleSelectShooters = () => {
    const selected = shooters.filter(
      (shooter) => shooter.group === selectedGroup 
    );
    setSelectedShooters(selected);
  };

  // Function to handle editing a shooter
  //Cette fonction est appelée lorsqu'un utilisateur souhaite éditer les détails d'un tireur spécifique.
  // Elle reçoit en argument le tireur à éditer, met à jour l'état pour stocker ce tireur actuel (currentShooter), puis ouvre la boîte de dialogue pour l'édition.
  const handleEditShooter = (shooter) => {
    setCurrentShooter(shooter);
    setOpen(true);
  };

  // Function to handle deleting a shooter
  //Cette fonction est appelée pour supprimer un tireur de la liste. 
  //Elle filtre la liste des tireurs pour exclure celui avec l'identifiant fourni, puis ferme la boîte de dialogue.
  const handleDeleteShooter = (shooterId) => {
    setShooters((prevShooters) =>
      prevShooters.filter((shooter) => shooter.id !== shooterId)
    );
    handleClose();
  };

  // Function to handle saving the edited shooter
  const handleSaveShooter = () => {
    //manquante
    handleClose();
  };

  // Function to organize shooting order
  const organizeShootingOrder = () => {
    const shootingOrder = [...selectedShooters];
    shootingOrder.sort(() => Math.random() - 0.5);
    setSelectedShooters(shootingOrder);
  };

  return (
    <Box>
       <Navbar />
      <Sidebar />
      <div style={{ padding: '10px', marginTop: '10px', textAlign: 'center', marginLeft: '250px' }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 ,display: "flex",
    justifyContent:"space-between" ,
    flexWrap: "nowrap",
    flexDirection: "row"}}>
          {/* <Typography variant="h5" gutterBottom>
            Sélection du groupe
          </Typography> */}
          <FormControl sx={{ minWidth: 250 }}>
          <InputLabel id="Group-select-label" sx={{ color: '#4B5320' }}>Groupe</InputLabel>
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
            width="50px"
            sx={{ bgcolor: "#4B5320", '&:hover': { bgcolor: "#4B5320" } }}
          >
            Organiser les tirs
          </Button>
          <IconButton
  onClick={handleManageShooters}
  disabled={!selectedGroup}
  sx={{ bgcolor: "#4B5320",color:"white", '&:hover': { bgcolor: "#4B5320" }, width:"50px" , height:"50px"}} 
>
  <AddIcon />
</IconButton>

        </Paper>
      </Grid>
      {selectedShooters.length > 0 && (
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
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
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditShooter(shooter)}
                        >
                          Modifier
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
        <DialogTitle>
          {  'Ajouter un nouveau tireur'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
               'Modifiez les détails du tireur'}
          </DialogContentText>
          <FormGroup>
            <FormControl margin="normal">
              <InputLabel>Prénom</InputLabel>
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
              <InputLabel>Nom</InputLabel>
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
              <InputLabel>Grade</InputLabel>
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
            >
              Supprimer
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveShooter} color="primary" >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    </div>
    </Box>
  );
}

export default ShootingOrder;
