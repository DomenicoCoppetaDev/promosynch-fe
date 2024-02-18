import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useJwt from "../../hook/useJwt";
import styles from './styles.module.scss';
import cn from 'classnames';

export default function UpdateHappening() {
    const { id } = useParams();
    console.log('event = ' + id)
    const navigate = useNavigate();
    const { promoterId, token } = useJwt();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }; 

    const handleCancel = () => {
        navigate(`/events/${id}`);
      };
    
    const [happening, setHappening] = useState({
        title: "",
        start: "",
        end: "",
        ticketPrice: "",
        location: "",
        description: ""

    });
    const [formData, setFormData] = useState({
        title: "",
        start: "",
        end: "",
        ticketPrice: "",
        location: "",
        description: ""

    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/events/` + id, {
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
                setFormData(data);
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    }, [id]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        
        setFormData({
          ...formData,
          cover: file,
        });
      };

      const updateCover = async (e) => {
        e.preventDefault();
      
        try {
          const formDataObj = new FormData();
          formDataObj.append('cover', formData.cover);
      
          const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/events/${id}/ucover`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataObj,
          });
      
          if (response.ok) {
            const updatedHappeningResponse = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/events/${id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            if (updatedHappeningResponse.ok) {
              const updatedHappeningData = await updatedHappeningResponse.json();
              setHappening(updatedHappeningData);
              toast.success('Cover successfully updated');
              navigate(`/events/${id}`);
            } else {
              const errorData = await updatedHappeningResponse.json();
              toast.error(errorData.error || 'Failed to fetch updated event');
            }
          } else {
            const errorData = await response.json();
            toast.error(errorData.error || 'Update failed');
          }
        } catch (error) {
          console.error(error);
        }
      };
      
      const updateHappening = async (e) => {
        e.preventDefault();
    
        const updatedData = {};
        let formChanged = false;
    
        for (const key in formData) {
            if (formData[key] !== happening[key]) {
                updatedData[key] = formData[key];
                formChanged = true;
            }
        }
    
        if (!formChanged) {
            toast.success('Event is up to date.');
            navigate(`/events/${id}`);
            return;
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/events/${id}/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                navigate(`/events/${id}`);
                toast.success('Event successfully updated');
            } else {
                console.error('Update failed');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    

      return (

       happening && (
            <>
            <Container className='p-3 mb-5' style={{ minHeight: '100vh' }}>
                <Row>
                    <Col>
                        <div className={cn(styles.coverDiv)}>
                                <Image className={cn(styles.cover)} src={happening.cover}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Form onSubmit={updateCover}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Event Cover</Form.Label>
                            <Form.Control
                            type="file"
                            name="cover"
                            onChange={handleFileChange}
                            />
                            <Form.Text className="text-muted">
                            *File must be in JPEG or PNG format
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex justify-content-evenly">
                        <Button className='buttonPrimary' type="submit">
                            Update Cover
                        </Button>
                        </div>
                    </Form>
                    <Form onSubmit={updateHappening}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Enter Title</Form.Label>
                            <Form.Control
                            type="string"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder={happening.title}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStart">
                            <Form.Label>Enter New Start Time</Form.Label>
                            <Form.Control
                            type="datetime-local"
                            name="start"
                            value={formData.start}
                            onChange={handleInputChange}
                            placeholder={happening.start}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEnd">
                            <Form.Label>Enter New End Time</Form.Label>
                            <Form.Control
                            type="datetime-local"
                            name="end"
                            value={formData.end}
                            onChange={handleInputChange}
                            placeholder={happening.end}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTicketPrice">
                            <Form.Label>Set New Ticket Price</Form.Label>
                            <Form.Control
                            type="string"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            onChange={handleInputChange}
                            placeholder={happening.ticketPrice}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLocation">
                            <Form.Label>Set Location</Form.Label>
                            <Form.Control
                            type="string"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder={happening.location}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Set New Description</Form.Label>
                            <Form.Control
                            as="textarea" 
                            style={{ height: '100px' }} 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder={happening.description}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-evenly">
                            <Button className="buttonPrimary" type="submit">
                            Update
                            </Button>
                            <Button variant="danger" onClick={handleCancel}>
                            Cancel
                            </Button>
                        </div>
                    </Form>
                
                </Row>
            </Container>
            </>
        )
    );
}