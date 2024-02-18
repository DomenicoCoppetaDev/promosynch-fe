import React, { useEffect } from 'react';
import { Button, Container, Form, Row, Col, Image} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTheme from '../../hook/useTheme';
import styles from './styles.module.scss';
import cn from 'classnames';
import MyGoogleLoginButton from './GoogleButton/GoogleButton.jsx';
import promosynch from '../../Images/promosynch.png';
import { jwtDecode } from 'jwt-decode';


export default function Login() {


    const { theme } = useTheme()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search)
    

    useEffect(() => {
        
        const promoterId = localStorage.getItem('promoterId') || searchParams.get('promoterId')
        const token = localStorage.getItem('token') ||  searchParams.get('token')
        const isTokenValid = () => {
            try {
                let decodedToken = jwtDecode(token)
                return decodedToken && decodedToken.exp > Date.now() / 1000;
            } catch (error) {
                return false;
            }
        };

        if (promoterId || token || isTokenValid()) {
            navigate(`/promoters/${promoterId}/dashboard`)
        }
    } )

    
    useEffect(() => {        
        const promoterId = localStorage.getItem('promoterId') || searchParams.get('promoterId')
        const token = localStorage.getItem('token') ||  searchParams.get('token')


        if (!promoterId) {
            localStorage.clear()
        } else {
        localStorage.setItem('promoterId', promoterId)
        localStorage.setItem('token',token)
        }

        if (window.location.search) {
            navigate(`/promoters/${promoterId}/dashboard`)
        }

    },[searchParams])


    const handleLogin = async (e) => {
        e.preventDefault()

        
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/session`,{
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  email,
                  password,
               }),
            }
         )
        
        const data = await response.json()

        if (data.token) {
            localStorage.clear();
            localStorage.setItem("promoterId", data.promoterId)
            localStorage.setItem("token", data.token)
            navigate(`/promoters/${data.promoterId}/dashboard`)
         } else {
            toast.error(data.message)
         }

        }

    const handleNavigate = (path) => {
        navigate(path);
    };

    

    return (

        <Container className={cn(styles.back,'d-flex align-items-center justify-content-center bg-transparent p-0')}>
            <Row className='justify-content-md-center mb-5'>
                <Col>
                    <div className={cn(styles.cardLogin,'shadow rounded pb-4')} >
                        <div className={cn(styles.loginCardTitle,'text-center p-4 mb-4')}>
                            <div className={cn(styles.logoDiv,'rounded-circle text-center')}>
                                <Image className={cn(styles.logoProm)} src={promosynch}/>
                            </div>
                            <h3 className={cn(styles.title, 'my-2 title')}>PROMOSYNCH</h3>
                            <p>your personal event manager</p>
                        </div>
                        <div>
                        <Form onSubmit={handleLogin} className='mx-3'>
                            <Form.Group className="mb-3"  controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    className='w-100 shadow-sm'
                                    required
                                    type='email' 
                                    name='email' 
                                    value={email} 
                                    onChange={(e) => {setEmail(e.target.value)}} 
                                    placeholder="Enter email" />
                                </Form.Group>
                            <Form.Group className="mb-3"  controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className='w-100 shadow-sm' required type="password" name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                            </Form.Group>
                            <div className='d-grid gap-2 mx-0 px-0'>
                                <button className={cn(styles.buttonprimary,'mx-0 w-100 shadow-sm rounded')} type="submit" >Login</button>
                                <MyGoogleLoginButton 
                                        className='mx-0 w-100 shadow-sm'
                                        onClick={() => {
                                        window.location.assign(
                                            `${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/oauth-google`
                                        )}}                                   
                                    />
                                <hr />
                                <p className='text-center my-0'>First time with us?</p>
                                <button className={cn(styles.buttonprimary, 'mx-0 w-100 shadow-sm rounded')} type="submit" >Register</button>
                            </div>
                        </Form>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    )
    }
