import './App.scss';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbarps from './components/Navbar/Navbarps.jsx';
import ToolBar from './components/Toolbar.jsx';
import Home from './views/home/Home.jsx';
import ProfilePromoter from './components/Promoters/ProfilePromoter.jsx';
import RegisterPromoter from './components/Promoters/RegisterPromoter.jsx';
import UpdatePromoter from './components/Promoters/UpdatePromoter.jsx';
import Terms from './views/TermsAndConditions.jsx';
import CreateHappening from './components/Happenings/CreateHappening.jsx';


function App() {
  return (
    <BrowserRouter>
      <Navbarps/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/promoters/register' element={<RegisterPromoter />} />
        <Route path='/promoters/:id/update' element={<UpdatePromoter />} />
        <Route path='/promoters/:id/profile' element={<ProfilePromoter />} />
        <Route path='/events/create' element={<CreateHappening />} />
        <Route path='/terms' element={<Terms />} />
      </Routes>
      <ToolBar/>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
