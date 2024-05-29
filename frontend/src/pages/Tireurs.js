import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Paper, Table, TableBody, TableCell, InputLabel, TableContainer, TableHead, TableRow, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, ThemeProvider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B5320',
    },
  },
});

const grades = ['Sergent', 'Capitaine', 'Lieutenant', 'Colonel', 'Général'];

const TireursPage = () => {
  const [tireurs, setTireurs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const [nouveauNom, setNouveauNom] = useState('');
  const [nouveauPrenom, setNouveauPrenom] = useState('');
  const [nouveauGrade, setNouveauGrade] = useState('');

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [selectedGrade, setSelectedGrade] = useState('');

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTireur, setEditTireur] = useState(null);

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const confirmDeleteTireur = () => {
    if (deleteId !== null) {
      const nouveauListeTireurs = tireurs.filter((tireur) => tireur._id !== deleteId);
      setTireurs(nouveauListeTireurs);
      closeDeleteDialog();
    }
  };

  const openEditDialog = (tireur) => {
    setEditTireur(tireur);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditTireur(null);
    setEditDialogOpen(false);
  };

  const confirmEditTireur = () => {
    closeEditDialog();
  };

  const ajouterTireur = async () => {
    if (nouveauNom && nouveauPrenom && nouveauGrade) {
      try {
        const nouveauTireur = {
          nom: nouveauNom,
          prenom: nouveauPrenom,
          grade: nouveauGrade,
          nombreTirs: 0,
        };
        const response = await axios.post('http://localhost:5000/api/tireurs/ajouter', nouveauTireur);
        console.log('Réponse du serveur:', response.data);  // Log la réponse du serveur
        setTireurs([...tireurs, response.data]);
        toggleModal();
        setNouveauNom('');
        setNouveauPrenom('');
        setNouveauGrade('');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du tireur', error.response || error);  // Log l'erreur avec plus de détails
        alert('Erreur lors de l\'ajout du tireur');
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const filterByGrade = (grade) => {
    setSelectedGrade(grade);
  };

  const filteredTireurs = selectedGrade ? tireurs.filter(tireur => tireur.grade === selectedGrade) : tireurs;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Sidebar />
        <div style={{ padding: '10px', marginTop: '10px', textAlign: 'center', marginLeft: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', textAlign: 'left' }}>
            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel id="category-select-label" sx={{ color: '#4B5320' }}>Sélectionner un grade</InputLabel>
              <Select
                labelId="grade-filter"
                value={selectedGrade}
                onChange={(e) => filterByGrade(e.target.value)}
                style={{ marginBottom: '20px', marginRight: '10px' }}
              >
                <MenuItem value="">Tous les grades</MenuItem>
                {grades.map((grade, index) => (
                  <MenuItem key={index} value={grade}>{grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <span style={{ marginLeft: 'auto' }}>
              <Button 
                onClick={toggleModal} 
                style={{ backgroundColor: '#4B5320', color: 'white' }} 
                variant="contained"
              >
                Ajouter un tireur
              </Button>
            </span>
          </div>

          <Modal open={isOpen} onClose={toggleModal}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' , color:"#4B5320"}}>
              <h2>Ajouter un tireur</h2>
              <TextField 
                label="Nom" 
                value={nouveauNom} 
                onChange={(e) => setNouveauNom(e.target.value)} 
                fullWidth 
                required 
                style={{ marginBottom: '10px' }}
              />
              <TextField 
                label="Prénom" 
                value={nouveauPrenom} 
                onChange={(e) => setNouveauPrenom(e.target.value)} 
                fullWidth 
                required 
                style={{ marginBottom: '10px' }}
              />
              <Select
                label="Grade"
                value={nouveauGrade}
                onChange={(e) => setNouveauGrade(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '20px' }}
              >
                {grades.map((grade, index) => (
                  <MenuItem key={index} value={grade}>{grade}</MenuItem>
                ))}
              </Select>
              <div style={{ textAlign: 'center' }}>
                <Button color="primary" onClick={ajouterTireur} style={{ backgroundColor: '#4B5320', color: 'white', marginRight: '10px' }}>Ajouter</Button>
                <Button onClick={toggleModal} style={{ backgroundColor: '#4B5320', color: 'white' }}>Annuler</Button>
              </div>
            </div>
          </Modal>

          <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogContent>
              Êtes-vous sûr de vouloir supprimer ce tireur ?
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog}>Annuler</Button>
              <Button onClick={confirmDeleteTireur} style={{ color: 'red' }}>Supprimer</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={editDialogOpen} onClose={closeEditDialog}>
            <DialogTitle>Modifier le tireur</DialogTitle>
            <DialogContent>
              <TextField 
                label="Nom" 
                value={editTireur ? editTireur.nom : ''} 
                onChange={(e) => setEditTireur({...editTireur, nom: e.target.value})} 
                fullWidth 
                required 
                style={{ marginBottom: '10px' }}
              />
              <TextField 
                label="Prénom" 
                value={editTireur ? editTireur.prenom : ''} 
                onChange={(e) => setEditTireur({...editTireur, prenom: e.target.value})} 
                fullWidth 
                required 
                style={{ marginBottom: '10px' }}
              />
              <Select
                label="Grade"
                value={editTireur ? editTireur.grade : ''}
                onChange={(e) => setEditTireur({...editTireur, grade: e.target.value})}
                fullWidth
                required
                style={{ marginBottom: '20px' }}
              >
                {grades.map((grade, index) => (
                  <MenuItem key={index} value={grade}>{grade}</MenuItem>
                ))}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeEditDialog}>Annuler</Button>
              <Button onClick={confirmEditTireur} style={{ color: '#4B5320' }}>Enregistrer</Button>
            </DialogActions>
          </Dialog>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Nombre de tirs</TableCell>
                  <TableCell></TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTireurs.map((tireur) => (
                  <TableRow key={tireur._id}>
                    <TableCell>{tireur.nom}</TableCell>
                    <TableCell>{tireur.prenom}</TableCell>
                    <TableCell>{tireur.grade}</TableCell>
                    <TableCell>{tireur.nombreTirs}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => openEditDialog(tireur)} style={{ marginRight: '10px' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => openDeleteDialog(tireur._id)}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TireursPage;
