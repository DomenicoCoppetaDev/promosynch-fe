import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import styles from './styles.module.scss';
import cn from 'classnames';


export default function HappeningDetails() {
    const { id } = useParams();

    const [happening, setHappening] = useState();
    const navigate = useNavigate();
    const promoterId = localStorage.getItem('promoterId');
    const token = localStorage.getItem('token');


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };
        const handleNavigate = (path) => {
            navigate(path);
        };

    //fetch evento
    useEffect(() => {
        fetch('http://localhost:3031/events/' + id, {
            method: 'GET',
        })
            .then((r) => {
                if (!r.ok) throw new Error('Event Not Found');
                return r.json();
            })
            .then((data) => {
                data.startFormatted = formatDate(data.start);
                data.endFormatted = formatDate(data.end);
                setHappening(data);
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    }, [id]);

    //cancella evento
    function deleteHappening() {
        fetch('http://localhost:3031/events/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((r) => {
                if (r.ok) {
                    toast.info('Event deleted successfully')
                    navigate(`/promoters/${promoterId}/dashboard`)
                } else {
                    toast.error('Something went wrong')
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    }

    const [clientName, setClientName] = useState('');
    const [clientSurname, setClientSurname] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientDateOfBirth, setClientDateOfBirth] = useState('');


    const registerClient = async (e) => {
        e.preventDefault();
        try {

            let response = await fetch('http://localhost:3031/events/' + id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        happeningId: id,
                        name: clientName,
                        surname: clientSurname,
                        email: clientEmail,
                        dateOfBirth: clientDateOfBirth,
                    })
                }
            );
            if (response.ok) {
                toast.success('Registration Completed');
                setClientName('');
                setClientSurname('');
                setClientDateOfBirth('');
                setClientEmail('');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };


    return (
        happening && (
            <>
                <Container>
                    <Row>
                        <Col>
                            <div className={cn(styles.coverDiv)}>
                                <Image className={cn(styles.cover)} src={happening.cover}/>
                            </div>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col>
                        <h3>{happening.title}</h3>
                        <p>Start: {happening.startFormatted}</p> 
                        <p>End: {happening.endFormatted}</p>
                        <p>Ticket Price: {happening.ticketPrice}</p>
                        <p>{happening.description}</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" >
                        <Col xs={10} md={6}>
                        <Form onSubmit={registerClient}>
                            <Form.Group className="mb-3" controlId="clientName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" name='name' value={clientName} onChange={(e) => { setClientName(e.target.value) }} placeholder="Enter Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control required type="text" name='surname' value={clientSurname} onChange={(e) => { setClientSurname(e.target.value) }} placeholder="Enter Surname" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDateOfBirth">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control required type="date" name='dateOfBirth' value={clientDateOfBirth} onChange={(e) => { setClientDateOfBirth(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" name='email' value={clientEmail} onChange={(e) => { setClientEmail(e.target.value) }} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">Register</Button>
                        </Form>
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-evenly px-2 my-3 text-center'>
                        <Col xs={10} md={6}>
                            <h5>Promoter Area</h5>
                            <div className="d-flex justify-content-evenly">
                                <Button className='' onClick={() => handleNavigate(`/events/${id}/update`)}>Update Event</Button>
                                <Button className='' variant="info" >Client List</Button>
                                <Button className='' variant="danger" onClick={deleteHappening}>Delete Event </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    );
}