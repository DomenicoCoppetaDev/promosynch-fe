import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Navbarps from './components/Navbar/Navbarps.jsx';
import ToolBar from './components/Toolbar/Toolbar.jsx';
import SideBar from './components/Sidebar/Sidebar.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ProfilePromoter from './components/Promoters/ProfilePromoter.jsx';
import RegisterPromoter from './components/Promoters/RegisterPromoter.jsx';
import HappeningDetails from './components/Happenings/HappeningDetails.jsx'
import UpdatePromoter from './components/Promoters/UpdatePromoter.jsx';
import UpdateHappening from './components/Happenings/UpdateHappeningDetails.jsx';
import Terms from './components/TermsAndConditions.jsx';
import CreateHappening from './components/Happenings/CreateHappening.jsx';
import { useState, useEffect} from 'react';
import Clients from './components/Clienti/Clients.jsx';
import ThemeContext from './context/theme.js';
import MyFooter from './components/MyFooter.jsx';
import { Container } from 'react-bootstrap';


function App() {


  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    if (theme === null) {
        localStorage.setItem('theme','light')
        setTheme('light')
    } else {
        localStorage.setItem('theme',theme)
    }
  }, [theme]);
 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [theme]);


  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className={`${theme} App`} style={{ minHeight: '100vh', maxWidth: '100%' }}>  
      <Navbarps theme={theme} setTheme={setTheme} />
      <SideBar />
      <Container fluid className='pt-5 pe-0 ps-0 pb-0'>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/promoters/register' element={<RegisterPromoter />} />
        <Route path='/promoters/:id/dashboard' element={<Dashboard theme={theme} />} />
        <Route path='/clients' element={<Clients/>} />
        <Route path='/promoters/:id/update' element={<UpdatePromoter />} />
        <Route path='/events/:id/update' element={<UpdateHappening />} />
        <Route path='/promoters/:id' element={<ProfilePromoter />} />
        <Route path='/events/create' element={<CreateHappening />} />
        <Route path='/events/:id' element={<HappeningDetails />} />
        <Route path='/terms' element={<Terms />} />
      </Routes>
      </Container>
      {/* <MyFooter /> */}
      <ToolBar />
    </div>
      <ToastContainer position="bottom-center" />
    </ThemeContext.Provider>
  );
}

export default App;
