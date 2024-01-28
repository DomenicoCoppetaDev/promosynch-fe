import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useJwt from '../../hook/useJwt.js';




export default function CreateHappening() {
    
    
    function getExtension(cover) {
    
        if (!cover || !cover.name) {
            return null;
        }
        const fileName = cover.name;
        const dotIndex = fileName.lastIndexOf('.');
        
        if (dotIndex === -1) {
            return null;
        }
        
        const extension = fileName.substring(dotIndex + 1).toLowerCase();
        return extension;
    }

    const { promoterId, token } = useJwt();

    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [cover, setCover] = useState(null);
    const [ticketPrice, setTicketPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    
    const createHappening = async (e) => {
        e.preventDefault();
    
        const defaultCover = 'https://res.cloudinary.com/dvof2wzo4/image/upload/v1703785119/dkjvcoxmxr6trwlbdz6z.jpg';
        
        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        const extension = getExtension(cover);
        const coverValue = cover ? cover : defaultCover;
        
        
        if (cover && (!extension || !allowedExtensions.includes(extension))) {
            toast.error('Invalid Cover File Format');
            return;
        }
        
        const promoter = localStorage.getItem('promoterId');

        try {
            const formData = new FormData();
            formData.append('promoter', promoter);
            formData.append('title', title);
            formData.append('start', start);
            formData.append('end', end);
            formData.append('cover', coverValue);
            formData.append('ticketPrice', ticketPrice);
            formData.append('location', location);
            formData.append('description', description);

    
            let response = await fetch(
                'http://localhost:3031/events/create',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
            if (response.ok) {
                toast.success('Event Successfully Created');
                navigate(`/promoters/${promoterId}/dashboard`);
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
    <Container className='px-5'>
        <div className='text-center'>
            <h4>Create Event</h4>
        </div>
        <Form onSubmit={createHappening}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control required type="string" name='title' value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Enter Event Title" />
            </Form.Group>
            <Container fluid className='px-0'>
                <Row>
                <Col>
                    <Form.Group className="mb-3"  controlId="formStart">
                        <Form.Label>Start</Form.Label>
                            <Form.Control required type="datetime-local" name='start' value={start} onChange={(e) => {setStart(e.target.value)}} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3"  controlId="formEnd">
                        <Form.Label>End</Form.Label>
                            <Form.Control required type="datetime-local" name='end' value={end} onChange={(e) => {setEnd(e.target.value)}} />
                    </Form.Group>
                </Col>
                </Row>
            </Container>
            <Container className='d-flex gap-3 px-0'>
                <Col xs={8}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Cover</Form.Label>
                        <Form.Control type="file" name='cover' onChange={(e) => { setCover(e.target.files[0]) }} />
                        <Form.Text className="text-muted">
                            *File must be in JPEG or PNG format
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3"  controlId="formTicket">
                        <Form.Label>Ticket Price</Form.Label>
                        <Form.Control required type="string" name='ticketPrice' value={ticketPrice} onChange={(e) => {setTicketPrice(e.target.value)}} />
                    </Form.Group>
                </Col>
            </Container>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control required type="string" name='location' value={location} onChange={(e) => {setLocation(e.target.value)}}  placeholder="Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    required 
                    as="textarea" 
                    style={{ height: '100px' }} 
                    name='description' value={description} 
                    onChange={(e) => {setDescription(e.target.value)}}  
                    placeholder="Type here the details of your event" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </Container>
    )
}