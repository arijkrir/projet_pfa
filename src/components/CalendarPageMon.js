import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Grid, Box, Button, Select, MenuItem, Typography, Card, CardContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/navbar';
import dayjs from 'dayjs';
import Sidebar from '../components/sidebar';

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

function ClendarPageMon() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [exerciseType, setExerciseType] = useState('');
  const [groups, setGroups] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activities, setActivities] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleAddEvent = () => {
    if (exerciseType && groups && startTime && endTime) {
      const newActivity = {
        type: exerciseType,
        groups: groups,
        startTime: startTime,
        endTime: endTime
      };
      const dateKey = dayjs(selectedDate).format('YYYY-MM-DD');
      const updatedActivities = {
        ...activities,
        [dateKey]: [...(activities[dateKey] || []), newActivity]
      };
      setActivities(updatedActivities);
      setExerciseType('');
      setGroups('');
      setStartTime('');
      setEndTime('');
      setPopupOpen(false);
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
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
                        <Card sx={{ backgroundColor: '#556B2F', width: '100%' }}>
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
      <Dialog open={popupOpen} onClose={handlePopupClose}>
        <DialogTitle>{selectedDate && dayjs(selectedDate).format('DD/MM/YYYY')}</DialogTitle>
        <DialogContent>
          <Select
            label="Type d'exercice"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2 }} 
          >
            <MenuItem value="Type 1">Type 1</MenuItem>
            <MenuItem value="Type 2">Type 2</MenuItem>
            <MenuItem value="Type 3">Type 3</MenuItem>
          </Select>
          <Select
            label="Groupes"
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2 }} 
          >
            <MenuItem value="Groupe 1">Groupe 1</MenuItem>
            <MenuItem value="Groupe 2">Groupe 2</MenuItem>
            <MenuItem value="Groupe 3">Groupe 3</MenuItem>
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
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAddEvent} sx={{ backgroundColor: '#556B2F', color: 'white' }}>Ajouter</Button>
          <Button variant="outlined" onClick={handlePopupClose} sx={{ color: '#556B2F' }}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ClendarPageMon;
