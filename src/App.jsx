import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbarps from './components/Navbar/Navbarps.jsx';
import ToolBar from './components/Toolbar/Toolbar.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Promoters/Dashboard.jsx';
import ProfilePromoter from './components/Promoters/ProfilePromoter.jsx';
import RegisterPromoter from './components/Promoters/RegisterPromoter.jsx';
import HappeningDetails from './components/Happenings/HappeningDetails.jsx'
import UpdatePromoter from './components/Promoters/UpdatePromoter.jsx';
import Terms from './views/TermsAndConditions.jsx';
import CreateHappening from './components/Happenings/CreateHappening.jsx';
import { useState, useEffect} from 'react';
import { AuthProvider } from './context/activeUser.js';

function App() {

  const currentTheme = localStorage.getItem('theme')
  console.log(currentTheme)

  const [theme, setTheme] = useState(currentTheme)


  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbarps/>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/promoters/register' element={<RegisterPromoter />} />
        <Route path='/promoters/:id/update' element={<UpdatePromoter />} />
        <Route path='/promoters/:id' element={<ProfilePromoter />} />
        <Route path='/events/create' element={<CreateHappening />} />
        <Route path='/events/:id' element={<HappeningDetails />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/promoters/:id/dashboard' element={<Dashboard />} />
      </Routes>
      <ToolBar/>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
