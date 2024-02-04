import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export default function useJwt() {
    
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(window.location.search)

    const promoterData = {
        promoterId: localStorage.getItem('promoterId') || searchParams.get('promoterId'),
        token: localStorage.getItem('token') ||  searchParams.get('token')
    }

    
    useEffect(() => {
        
        const isTokenValid = () => {
            try {
                let decodedToken = jwtDecode(promoterData.token)
                return decodedToken && decodedToken.exp > Date.now() / 1000;
            } catch (error) {
                return false;
            }
        };

        if (!promoterData.promoterId || !promoterData.token || !isTokenValid()) {
            localStorage.clear();
            navigate('/')
        }


        if (window.location.search) {
            navigate(window.location.pathname)
        }
    }, [promoterData, navigate])

    return promoterData
}