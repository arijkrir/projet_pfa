import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importez createTheme et ThemeProvider
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import SidebarAdmin from '../components/SidebarAdmin';
import Navbar from '../components/navbar';

// Définir un thème personnalisé avec la couleur principale en vert militaire
const theme = createTheme({
  palette: {
    primary: {
      main: '#4B5320', 
    },
  },
});

// Exemple de données de joueurs
const players = [
  { id: 1, firstName: 'Amir', lastName: 'Bouj', group: '1', pointsForTarget: 80, precisionPoints: 30, otherPoints: 20, score: 250 },
  { id: 2, firstName: 'Yass', lastName: 'ch', group: '2', pointsForTarget: 90, precisionPoints: 40, otherPoints: 20, score: 300 },
  { id: 3, firstName: 'ali', lastName: 'mab', group: '1', pointsForTarget: 85, precisionPoints: 35, otherPoints: 20, score: 280 },
  { id: 4, firstName: 'houss', lastName: 'kr', group: '2', pointsForTarget: 75, precisionPoints: 25, otherPoints: 20, score: 270 },
  { id: 5, firstName: 'afif', lastName: 'krir', group: '3', pointsForTarget: 95, precisionPoints: 45, otherPoints: 20, score: 320 },
  { id: 6, firstName: 'omar', lastName: 'mch', group: '4', pointsForTarget: 88, precisionPoints: 38, otherPoints: 20, score: 290 },
  { id: 7, firstName: 'ahmed', lastName: 'gh', group: '5', pointsForTarget: 92, precisionPoints: 42, otherPoints: 20, score: 310 },
  { id: 8, firstName: 'mohamed', lastName: 'sk', group: '3', pointsForTarget: 70, precisionPoints: 20, otherPoints: 20, score: 270 },
  { id: 9, firstName: 'aymen', lastName: 'abb', group: '4', pointsForTarget: 82, precisionPoints: 32, otherPoints: 20, score: 260 },
  { id: 10, firstName: 'aziz', lastName: 'dr', group: '5', pointsForTarget: 98, precisionPoints: 48, otherPoints: 20, score: 330 },
];

export default function PlayerScores() {
  const [selectedGroup, setSelectedGroup] = useState(''); // État pour stocker le groupe sélectionné
  const [commentDialogOpen, setCommentDialogOpen] = useState(false); // État pour gérer l'ouverture et la fermeture du popup de commentaire
  const [comment, setComment] = useState(''); // État pour stocker le commentaire
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false); // État pour gérer l'ouverture et la fermeture du popup d'historique
  const [selectedPlayer, setSelectedPlayer] = useState(null); // État pour stocker le joueur sélectionné

  // Fonction de changement de groupe
  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

 // Fonction pour ouvrir le popup de commentaire pour un joueur spécifique
const handleCommentOpen = (player) => {
  // setSelectedPlayer(player);
  setCommentDialogOpen(true);
};


  // Fonction pour fermer le popup de commentaire
  const handleCommentClose = () => {
    setCommentDialogOpen(false);
  };

  // Fonction pour soumettre le commentaire
  const handleSubmitComment = () => {
    // Traitement du commentaire ici
    console.log('Comment submitted:', comment);
    setComment(''); // Efface le commentaire après soumission
    setCommentDialogOpen(false); // Ferme le popup de commentaire
  };

  // Fonction pour ouvrir le popup d'historique
  const handleHistoryOpen = (player) => {
    setSelectedPlayer(player);
    setHistoryDialogOpen(true);
  };

  // Fonction pour fermer le popup d'historique
  const handleHistoryClose = () => {
    setSelectedPlayer(null);
    setHistoryDialogOpen(false);
  };
  
  const filteredPlayers = selectedGroup ? players.filter(player => player.group === selectedGroup) : players;


  const sortedPlayers = [...filteredPlayers].sort((a, b) => b.score - a.score);

  // Obtenez le score maximum
  const maxScore = sortedPlayers.length > 0 ? sortedPlayers[0].score : 0;

  // Données fictives pour l'historique par semaine de chaque joueur
  const playerHistory = [
    { week: '22-04', pointsForTarget: 70, precisionPoints: 20, otherPoints: 10, totalPoints: 100 },
    { week: '29-04', pointsForTarget: 75, precisionPoints: 25, otherPoints: 10, totalPoints: 110 },
    { week: '06-05', pointsForTarget: 80, precisionPoints: 30, otherPoints: 10, totalPoints: 120 },
    // Ajoutez d'autres données d'historique par semaine ici
  ];

  return (
    <ThemeProvider theme={theme}> 
      <div>
        <SidebarAdmin />
        <Navbar />
        <div style={{ marginLeft: '270px', maxWidth: '950px' }}> 
          <Typography variant="h5" gutterBottom marginTop={'20px'}> 
            Scores des joueurs
          </Typography>
          {/* Sélecteur de groupe */}
          <Select
            value={selectedGroup}
            onChange={handleGroupChange}
            displayEmpty
            style={{ marginBottom: '10px' }}
          >
            <MenuItem value="" >
              Tous les groupes
            </MenuItem>
            <MenuItem value="1">Groupe 1</MenuItem>
            <MenuItem value="2">Groupe 2</MenuItem>
            <MenuItem value="3">Groupe 3</MenuItem>
            <MenuItem value="4">Groupe 4</MenuItem>
            <MenuItem value="5">Groupe 5</MenuItem>
          </Select>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nom</TableCell>
                  <TableCell align="center">Points pour cible</TableCell>
                  <TableCell align="center">Points de précision</TableCell>
                  <TableCell align="center">Points de groupement</TableCell>
                  <TableCell align="center">Total des points</TableCell>
                  <TableCell align="center">Groupe</TableCell>
                  <TableCell align="center">Commentaire</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPlayers.map((player) => (
                  <TableRow >
                    <TableCell align="center" key={player.id} onClick={() => handleHistoryOpen(player)}>
                      {player.score === maxScore && '👑'} <h4><strong>{player.lastName} {player.firstName}</strong></h4>
                    </TableCell>
                    <TableCell align="center">{player.pointsForTarget}</TableCell>
                    <TableCell align="center">{player.precisionPoints}</TableCell>
                    <TableCell align="center">{player.otherPoints}</TableCell>
                    <TableCell align="center">{player.score}</TableCell>
                    <TableCell align="center">{player.group}</TableCell>
                    <TableCell align="center">
                      <Button onClick={handleCommentOpen} style={{ color: '#4B5320' }}>
                        <CommentIcon style={{ color: '#4B5320' }} />
                      </Button>
                    </TableCell>
                  </TableRow>     
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Popup de commentaire */}
          <Dialog open={commentDialogOpen} onClose={handleCommentClose}>
            <DialogTitle>Ajouter un commentaire</DialogTitle>
            <DialogContent>
              <TextField
                label="Commentaire"
                multiline
                rows={4}
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCommentClose} style={{ color: '#4B5320' }}>Annuler</Button> 
              <Button onClick={handleSubmitComment} style={{ color: '#4B5320' }}>Envoyer</Button> 
            </DialogActions>
          </Dialog>
          {/* Popup d'historique */}
          <Dialog open={historyDialogOpen} onClose={handleHistoryClose}>
            <DialogTitle>{selectedPlayer && `${selectedPlayer.firstName} ${selectedPlayer.lastName} - Historique`}</DialogTitle>
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Semaine</TableCell>
                    <TableCell>Points pour cible</TableCell>
                    <TableCell>Points de précision</TableCell>
                    <TableCell>Autres points</TableCell>
                    <TableCell>Total des points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playerHistory.map((historyItem) => (
                    <TableRow key={historyItem.week}>
                      <TableCell>{historyItem.week}</TableCell>
                      <TableCell>{historyItem.pointsForTarget}</TableCell>
                      <TableCell>{historyItem.precisionPoints}</TableCell>
                      <TableCell>{historyItem.otherPoints}</TableCell>
                      <TableCell>{historyItem.totalPoints}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleHistoryClose} style={{ color: '#4B5320' }}>Fermer</Button> 
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
}
