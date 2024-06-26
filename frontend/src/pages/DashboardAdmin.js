import React, { useState } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import Navbar from '../components/navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const drawerWidth = 240;

const data = [
  { week: '2024-05-27', Seances: 2 }, 
  { week: '2024-06-06', Seances: 5 }, 
  { week: '2024-06-13', Seances: 3 }, 
  { week: '2024-06-20', Seances: 4 }, 
];

const activitiesData = [
  { week: '2024-06-06', type: '50m', groups: '1, 3', startTime: '08:00', endTime: '12:00' },
  { week: '2024-06-06', type: '300m', groups: '5, 4', startTime: '14:00', endTime: '18:00' },
  { week: '2024-06-06', type: '50m', groups: '2, 3', startTime: '08:00', endTime: '12:00' },
  { week: '2024-06-06', type: '100m', groups: '1, 5', startTime: '14:00', endTime: '18:00' },
];

const DashboardAdmin = () => {
  // Obtenir la date actuelle
  const currentDate = new Date();
  
  const [selectedWeek, setSelectedWeek] = useState('2024-06-06'); 

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const weekActivities = activitiesData.filter(activity => activity.week === selectedWeek);

  return (
    <div>
      <SidebarAdmin />
      <Navbar />
      <div style={{ marginLeft: '270px', maxWidth: '950px' }}>
        <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%', padding: '20px' }}>
            <h2>Activité par Semaine</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Seances" stroke="#556B2F" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ width: '50%', padding: '20px' }}>
            <h2>Activités Militaires - cette Semaine {new Date(selectedWeek).toLocaleDateString()}</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type d'activité</TableCell>
                    <TableCell>Groupes présents</TableCell>
                    <TableCell>Heure de début</TableCell>
                    <TableCell>Heure de fin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weekActivities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.groups}</TableCell>
                      <TableCell>{activity.startTime}</TableCell>
                      <TableCell>{activity.endTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardAdmin;
