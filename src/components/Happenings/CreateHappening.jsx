import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';





export default function CreateHappening() {

    const [title, setTitle] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [startTime, setStartTime] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [endTime, setEndTime] = useState('');
    const [cover, setCover] = useState(null);
    const [ticketPrice, setTicketPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    
    const registerPromoter = async (e) => {
        e.preventDefault();
        console.log(cover);
        const defaultCover = 'https://res.cloudinary.com/dvof2wzo4/image/upload/v1703785119/dkjvcoxmxr6trwlbdz6z.jpg';
        function getExtension(cover) {
            const fileName = cover.name;
            const dotIndex = fileName.lastIndexOf('.');
            
            if (dotIndex === -1) {
                return null;
            }
            
            const extension = fileName.substring(dotIndex + 1).toLowerCase();
            return extension;
        }
        
        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        const extension = getExtension(cover);
        const coverValue = cover === null || cover === undefined || cover === '' ? defaultCover : cover;

        if (!extension || !allowedExtensions.includes(extension)) {
        toast.error('Invalid Cover File Format');
        return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('dateStart', dateStart);
            formData.append('dateEnd', dateEnd);
            formData.append('cover', coverValue);
            // formData.append('promoter', promoter);
            formData.append('ticketPrice', ticketPrice);
            formData.append('location', location);
            formData.append('description', description);

    
            let response = await fetch(
                'http://localhost:3031/events/create',
                {
                    method: 'POST',
                    body: formData,
                }
            );
    
            if (response.ok) {
                toast.success('Promoter Successfully Registered');
            } else {
                const errorData = await response.json();  
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            }
        } catch (error) {
            toast.error(error.message);  // Utilizzare solo la stringa dell'errore
            console.error(error);
        }
    };

    return (
    <Container className='px-5'>
        <div className='text-center'>
            <h4>Create Event</h4>
        </div>
        <Form onSubmit={registerPromoter}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="string" name='title' value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Enter Event Title" />
            </Form.Group>
            <Form.Group className="mb-3"  controlId="formDateStart">
                <Form.Label>Start</Form.Label>
                <div className='d-flex gap-3'>
                    <Form.Control type="date" name='dateStart' value={dateStart} onChange={(e) => {setDateStart(e.target.value)}} />
                    <Form.Control type="time" name='startTime' value={startTime} onChange={(e) => {setStartTime(e.target.value)}} />
                </div>
            </Form.Group>
            <Form.Group className="mb-3"  controlId="formDateEnd">
                <Form.Label>End</Form.Label>
                <div className='d-flex gap-3'>
                    <Form.Control type="date" name='dateEnd' value={dateEnd} onChange={(e) => {setDateEnd(e.target.value)}} />
                    <Form.Control type="time" name='endTime' value={endTime} onChange={(e) => {setEndTime(e.target.value)}} />
                </div>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cover</Form.Label>
                <Form.Control type="file" name='cover' onChange={(e) => { setCover(e.target.files[0]) }} />
                <Form.Text className="text-muted">
                    *File must be in JPEG or PNG format
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3"  controlId="formDateEnd">
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control type="string" name='ticketPrice' value={ticketPrice} onChange={(e) => {setTicketPrice(e.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="string" name='location' value={location} onChange={(e) => {setLocation(e.target.value)}}  placeholder="Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
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