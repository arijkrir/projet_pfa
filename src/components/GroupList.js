import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import SidebarAdmin from '../components/SidebarAdmin';
import Navbar from '../components/navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Définir les couleurs personnalisées
const theme = createTheme({
  palette: {
    primary: {
      main: '#4B5320', // Vert militaire
    },
    secondary: {
      main: '#556B2F', // Autre nuance de vert
    },
  },
});

// Données fictives des tireurs
const tireursData = [
  { id: 1, groupe: "Groupe 1", nom: "Nom1", prenom: "Prenom1", grade: "Grade1" },
  { id: 2, groupe: "Groupe 1", nom: "Nom2", prenom: "Prenom2", grade: "Grade2" },
  { id: 3, groupe: "Groupe 2", nom: "Nom3", prenom: "Prenom3", grade: "Grade3" },
  // Ajoutez d'autres tireurs ici
];

export default function GroupList() {
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleGroupSelect = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <SidebarAdmin />
        <Navbar />
        <div style={{ padding: '10px', marginTop: '10px', marginLeft: '250px' , marginRight:'50px' }}>
          <Typography variant="h5" gutterBottom>
            Groupes de tireurs
          </Typography>
          <FormControl variant="outlined" style={{ marginBottom: '10px' }}>
            <Select
              value={selectedGroup}
              onChange={handleGroupSelect}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Sélectionnez un groupe
              </MenuItem>
              {Array.from(new Set(tireursData.map(tireur => tireur.groupe))).map((group, index) => (
                <MenuItem key={index} value={group}>{group}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Afficher le tableau des tireurs si un groupe est sélectionné */}
          {selectedGroup && (
            <div>
              <Typography variant="h6" gutterBottom>
                Tireurs du groupe {selectedGroup}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Prénom</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tireursData.map((tireur) => (
                      tireur.groupe === selectedGroup && (
                        <TableRow key={tireur.id}>
                          <TableCell>{tireur.nom}</TableCell>
                          <TableCell>{tireur.prenom}</TableCell>
                          <TableCell>{tireur.grade}</TableCell>
                        </TableRow>
                      )
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
