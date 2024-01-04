import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (

        <Container>
            <Form>
                <Form.Group className="mb-3"  controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                <Form.Group className="mb-3"  controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                </Form.Group>
                <div className='text-center'>
                    <Link to={`/promoters/register`}>
                        <Button className='mx-2'>Login</Button>
                    </Link>
                    <Link to={`/promoters/register`}>
                        <Button className='mx-2'>Register</Button>
                    </Link>
                    <Link to={`/events/create`}>
                        <Button className='mx-2'>Create Event</Button>
                    </Link>
                </div>
            </Form>
        </Container>
    )
    }