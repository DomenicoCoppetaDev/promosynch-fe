import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";

export default function HappeningDetails() {
    const { id } = useParams();
    const [happening, setHappening] = useState();

    
    useEffect(() => {
        fetch('http://localhost:3031/events/event/' + id,{
            method: 'GET',
        })
        .then((r) => {
            if (!r.ok) throw new Error('Promoter Not Found');
            return r.json();
        })
        .then((data) => {
            // Modifica la data di nascita nel formato desiderato
            data.dateStartFormatted = formatDate(data.dateStart);
            setHappening(data);
        })
        .catch((error) => {
            toast.error(error.message);
            console.error(error);
        }); 
        },[id]);
    
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
        
            return `${day}-${month}-${year}`;
          }; 

    return (
        happening && (
            <Container>
                <Row>
                    <p>{happening.title}</p>
                    <p>{happening.dateStart}</p>
                    <p>{happening.dateEnd}</p>
                    <p>{happening.description}</p>
    
                </Row>

                <Row>
                    {/* <Col xs={12} md={4}>
                        {promoter.avatar && <Image className='rounded-circle' src={promoter.avatar} alt="Promoter Avatar" />}
                    </Col>
                    <Col xs={12} md={8}>
                        <p>Name: {promoter.name}</p>
                        <p>Surname: {promoter.surname}</p>
                        <p>Birth Date: {promoter.dateOfBirthFormatted}</p>
                        <p>Email: {promoter.email}</p>
                    </Col> */}
                </Row>
            </Container>
            )
        );
}