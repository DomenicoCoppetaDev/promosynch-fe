import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import jwt from 'jsonwebtoken';

export default function useJwt() {
    
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(window.location.search)

    if (searchParams.get('promoterId')){
        localStorage.setItem('promoterId', searchParams.get('promoterId'))
    }

    if (searchParams.get('token')){
        localStorage.setItem('token', searchParams.get('token'))
    }

    const promoterData = {
        promoterId: localStorage.getItem('promoterId'),
        token: localStorage.getItem('token'),
    }

    // const isTokenValid = () => {
    //     try {
    //         const decodedToken = jwt.decode(promoterData.token);
    //         return decodedToken && decodedToken.exp > Date.now() / 1000;
    //     } catch (error) {
    //         return false;
    //     }
    // };

    useEffect(() => {

        if (!promoterData.promoterId || !promoterData.token ) {
            navigate('/')
        }
        // if (!promoterData.promoterId || !promoterData.token || !isTokenValid()) {
        //     navigate('/')
        // }


        if (window.location.search) {
            navigate(window.location.pathname)
        }
    }, [promoterData.promoterId, promoterData.token, navigate])

    return promoterData
}