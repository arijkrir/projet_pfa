import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Grid, Box, Button, Select, MenuItem, Typography, Card, CardContent, InputLabel, Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556B2F',
    },
    secondary: {
      main: '#556B2F',
    },
  },
});

function ClendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [exerciseType, setExerciseType] = useState('');
  const [groups, setGroups] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activities, setActivities] = useState({});
  const [alertOpen, setAlertOpen] = useState(false); 

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setPopupOpen(true);
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      try {
        const response = await axios.get(`http://localhost:5000/api/seances/${formattedDate}`);
        setActivities({ [formattedDate]: response.data });
      } catch (error) {
        console.error('Erreur lors de la récupération des séances:', error);
      }
    }
  };
  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleAddEvent = async () => {
    if (exerciseType && groups.length > 0 && startTime && endTime) {
      const startTimeObject = dayjs(startTime, 'HH:mm');
      const endTimeObject = dayjs(endTime, 'HH:mm');

      if (endTimeObject.isAfter(startTimeObject)) {
        const newActivity = {
          type: exerciseType,
          groups,
          startTime,
          endTime,
          date: dayjs(selectedDate).format('YYYY-MM-DD')
        };

        try {
          await axios.post('http://localhost:5000/api/seances', newActivity);
          setExerciseType('');
          setGroups([]);
          setStartTime('');
          setEndTime('');
          setPopupOpen(false);
          handleDateChange(selectedDate); // Refresh activities after adding a new one
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la séance:', error);
        }
      } else {
        setAlertOpen(true); 
      }
    } else {
      setAlertOpen(true); 
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={3}>
          <SidebarAdmin />
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ padding: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    highlight={selectedDate}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                {selectedDate && activities[dayjs(selectedDate).format('YYYY-MM-DD')] && (
                  <Box mt={2}>
                    <Typography variant="h6">Activités ajoutées pour {dayjs(selectedDate).format('DD/MM/YYYY')}</Typography>
                    {activities[dayjs(selectedDate).format('YYYY-MM-DD')].map((activity, index) => (
                      <Box key={index} mt={1}>
                        <Card sx={{ backgroundColor: '#556B2F', width: '80%' }}>
                          <CardContent>
                            <Typography sx={{ color: 'white' }}>Type d'exercice: {activity.type}</Typography>
                            <Typography sx={{ color: 'white' }}>Groupes: {activity.groups}</Typography>
                            <Typography sx={{ color: 'white' }}>Heure de début: {activity.startTime}</Typography>
                            <Typography sx={{ color: 'white' }}>Heure de fin: {activity.endTime}</Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={popupOpen} onClose={handlePopupClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedDate && dayjs(selectedDate).format('DD/MM/YYYY')}</DialogTitle>
        <DialogContent sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <InputLabel>Types</InputLabel>
          <Select
            label="Type d'exercice"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2 , color:"#4B5320" }} 
            InputLabelProps={{ style: { color: '#4B5320' } }}
          >
            <MenuItem value="Type 1" sx={{ color: '#4B5320' }}>Type 1</MenuItem>
            <MenuItem value="Type 2" sx={{ color: '#4B5320' }}>Type 2</MenuItem>
            <MenuItem value="Type 3" sx={{ color: '#4B5320' }}>Type 3</MenuItem>
          </Select>
          <InputLabel>Groupes</InputLabel>
          <Select
            label="Groupes"
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
            fullWidth
            multiple
            margin="normal"
            sx={{ marginBottom: 2 }} 
            InputLabelProps={{ style: { color: '#4B5320' } }}
          >
            <MenuItem value="Groupe 1" sx={{ color: '#4B5320' }}>Groupe 1</MenuItem>
            <MenuItem value="Groupe 2" sx={{ color: '#4B5320' }}>Groupe 2</MenuItem>
            <MenuItem value="Groupe 3" sx={{ color: '#4B5320' }}>Groupe 3</MenuItem>
          </Select>
          <TextField
            label="Heure de début"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <TextField
            label="Heure de fin"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2, width: '100%' }} 
          />
          {/* Alerte de MUI */}
          <Alert severity="error" onClose={() => setAlertOpen(false)} open={alertOpen} sx={{ marginBottom: 2 }}>L'heure de fin doit être supérieure à l'heure de début.</Alert>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAddEvent} sx={{ backgroundColor: '#556B2F', color: 'white' }}>Ajouter</Button>
          <Button variant="outlined" onClick={handlePopupClose} sx={{ color: '#556B2F' }}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ClendarPage;
