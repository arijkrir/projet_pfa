import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import TireursPage from './pages/Tireurs';
import OrganiserTirs from './pages/OrganiserTirs';
import DashboardAdmin from './pages/DashboardAdmin';
import CalendarPage from './components/CalendarPage';
import GroupList from './components/GroupList';
import PlayerScores from './components/PlayerScores';
import CalendarPageMon from './components/CalendarPageMon';
import ShooterDashboard from './pages/ShooterDashboard';


function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Profil' element={<Profile/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/DashboardAdmin' element={<DashboardAdmin/>}></Route>
      <Route path='/agenda' element={<CalendarPage/>}></Route>
      <Route path='/Calendrier' element={<CalendarPageMon/>}></Route>
      <Route path='/groupes' element={<GroupList/>}></Route>
      <Route path='/scores' element={<PlayerScores/>}></Route>
      <Route path='/tireurs' element={<TireursPage/>}></Route>
      <Route exact path='/shooter/:shooterId' element={<ShooterDashboard/>} ></Route>
      <Route path='/organisation-tirs' element={<OrganiserTirs/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
