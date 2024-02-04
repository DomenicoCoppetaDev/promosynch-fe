import React, { useEffect } from 'react';
import { Button, Container, Form, Row, Col, Card} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTheme from '../hook/useTheme';
import { GoogleLoginButton } from "react-social-login-buttons"
import useJwt from '../hook/useJwt';


export default function Login() {


    const { theme } = useTheme()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search)
    
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

        <Container className='d-flex align-items-center justify-content-center p-0' style={{ minHeight: '100vh', maxWidth: '100%' }}>
            <Row >
            <Col 
            xs={12} sm={10} md={12} lg={12} xl={12} >
            <Card className='p-4 mx-5'> 
                    <Form onSubmit={handleLogin} className='mx-3'>
                        <Form.Group className="mb-3"  controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                className='w-100'
                                required
                                type='email' 
                                name='email' 
                                value={email} 
                                onChange={(e) => {setEmail(e.target.value)}} 
                                placeholder="Enter email" />
                            </Form.Group>
                        <Form.Group className="mb-3"  controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='w-100' required type="password" name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                        </Form.Group>
                        <div className='d-grid gap-2 mx-0 px-0'>
                            <Button className='mx-0 w-100' type="submit" >Login</Button>
                            <GoogleLoginButton

                                    onClick={() => {
                                    window.location.assign(
                                        `${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/oauth-google`
                                    )
                                    }}
                                />
                            <hr />
                            <Button className='mx-0 w-100' onClick={() => handleNavigate('/promoters/register')}>Register</Button>
                        </div>
                    </Form>
            </Card>
            </Col>
            </Row>
        </Container>
    )
    }
