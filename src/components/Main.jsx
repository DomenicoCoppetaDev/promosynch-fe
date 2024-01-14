import Dashboard from "../components/Dashboard.jsx"
import ProfilePromoter from './Promoters/ProfilePromoter.jsx';
import HappeningDetails from '../components/Happenings/HappeningDetails.jsx'
import UpdatePromoter from '../components/Promoters/UpdatePromoter.jsx';
import Terms from './TermsAndConditions.jsx';
import CreateHappening from '../components/Happenings/CreateHappening.jsx';
import Navbarps from '../components/Navbar/Navbarps.jsx';
import ToolBar from '../components/Toolbar/Toolbar.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from "react";


export default function MainComponent() {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const promoterId = localStorage.getItem('promoterId');
        const token = localStorage.getItem('token');
        
        if (!promoterId || !token) {
            navigate('/login');
        }
    }, []);


return (
    <div>
        <Routes>
            <Route path='/promoters/:id/dashboard' element={<Dashboard />} />
            <Route path='/promoters/:id/update' element={<UpdatePromoter />} />
            <Route path='/promoters/:id' element={<ProfilePromoter />} />
            <Route path='/events/create' element={<CreateHappening />} />
            <Route path='/events/:id' element={<HappeningDetails />} />
            <Route path='/terms' element={<Terms />} />
        </Routes>
    </div>
)

}