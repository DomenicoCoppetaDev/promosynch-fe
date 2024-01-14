import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function useJwt() {
    const navigate = useNavigate()

    const searchParams = URLSearchParams(window.location.search)

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

    useEffect(() => {

        if (!promoterData.promoterId || !promoterData.token) {
            navigate('/')
        }

        if (window.location.search) {
            navigate(window.location.pathname)
        }
    }, [promoterData.promoterId, promoterData.token, navigate])

    return promoterData
}