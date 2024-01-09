import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/activeUser';



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault()

        const response = await fetch(
            'http://localhost:3031/promoters/session',
            {
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
            login(data.promoterId);
         }

         navigate(`/promoters/${data.promoterId}/dashboard`)
        }
    
    return (

        <Container>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3"  controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        required
                        type="email" 
                        name='email' 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value)}} 
                        placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                <Form.Group className="mb-3"  controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                </Form.Group>
                    <Button className='mx-2' type="submit">Login</Button>
            </Form>
                    <Link to={`/promoters/register`}>
                        <Button className='mx-2'>Register</Button>
                    </Link>
        </Container>
    )
    }
