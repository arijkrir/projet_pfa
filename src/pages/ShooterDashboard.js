import React, { useRef, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B5320',
    },
  },
});

function ShooterDashboard() {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [notes, setNotes] = useState({ note1: 0, note2: 0, note3: 0 });

  const startRecording = () => {
    console.log('Start recording');
    if (!stream) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setStream(stream);
          videoRef.current.srcObject = stream;
          setRecording(true);
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    }
  };

  const stopRecording = () => {
    console.log('Stop recording');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setRecording(false);
    }
  };

  const handleChangeNote = (event, noteKey) => {
    const value = event.target.value;
    setNotes(prevNotes => ({ ...prevNotes, [noteKey]: value }));
  };

  const totalNotes = parseInt(notes.note1) + parseInt(notes.note2) + parseInt(notes.note3);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <Sidebar />
        <div style={{ padding: '10px', marginTop: '10px', textAlign: 'center', marginLeft: '250px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom style={{ color: '#4B5320' }}>
                  Dashboard AI
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: '#4B5320' }}>
                  Visualisation des tirs
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {recording ? (
                    <video ref={videoRef} width="640" height="480" autoPlay></video>
                  ) : (
                    <div onClick={startRecording} style={{ cursor: 'pointer', width: 300, height: 300, backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CameraAlt style={{ fontSize: 200 }} />
                    </div>
                  )}
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      label="Note 1"
                      variant="outlined"
                      value={notes.note1}
                      onChange={(e) => handleChangeNote(e, 'note1')}
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Note 2"
                      variant="outlined"
                      value={notes.note2}
                      onChange={(e) => handleChangeNote(e, 'note2')}
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Note 3"
                      variant="outlined"
                      value={notes.note3}
                      onChange={(e) => handleChangeNote(e, 'note3')}
                      fullWidth
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom style={{ color: '#4B5320', marginTop: 20 }}>
                      Total: {totalNotes}
                    </Typography>
                  </Grid>
                </Grid>
                {recording ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={stopRecording}
                    style={{ backgroundColor: '#4B5320', color: 'white', marginTop: 20 }}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={startRecording}
                    style={{ backgroundColor: '#4B5320', color: 'white', marginTop: 20 }}
                  >
                    Sauvegarder
                  </Button>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default ShooterDashboard;
