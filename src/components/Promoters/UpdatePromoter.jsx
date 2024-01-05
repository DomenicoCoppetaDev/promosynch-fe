import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams} from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";

export default function ProfilePromoter(){
    const { id } = useParams();

    useEffect(() => {

        fetch( 'http://localhost:3031/promoters/' + id , {
            method: 'GET',
            redirect: 'follow'
        })
        .then((r) => {
            if (!r.ok) throw new Error('Promoter Not Found');
            return r.json();
            })
        .then((data) => {
            setPromoter(data);
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
    
    function getExtension(avatar) {
        if (!avatar || !avatar.name) {
            return null;
        }
        const fileName = avatar.name;
        const dotIndex = fileName.lastIndexOf('.');
    
        if (dotIndex === -1) {
            return null;
        }
    
        const extension = fileName.substring(dotIndex + 1).toLowerCase();
        return extension;
    }
    
    const [promoter, setPromoter] = useState({
        name: '',
        surname: '',
        email: '',
        dateOfBirth: '',
        avatar:'',
        password: '',
      });

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        dateOfBirth: '',
        avatar:'',
        password: '',
      });
    
      const updatePromoter = async (e) => {
        e.preventDefault();
        console.log(formData.avatar);
    
        if (formData.avatar === null) {
            formData.avatar = promoter.avatar
        }


        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        const extension = getExtension(formData.avatar);
    
        const updatedData = {};
        for (const key in formData) {
            if (formData[key] !== promoter[key]) {
                updatedData[key] = formData[key];
            }
        }
    
        try {
            const response = await fetch(`http://localhost:3031/promoters/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                console.log('Dati aggiornati con successo');
            } else {
                console.error('Errore nell\'aggiornamento dei dati');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        promoter && (
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    {promoter.avatar && <Image className='rounded-circle' src={promoter.avatar} alt="Promoter Avatar" />}
                </Col>
                <Col xs={12} md={8}>
                <Form onSubmit={updatePromoter}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="string" name='name' value={formData.name} onChange={handleInputChange} placeholder={promoter.name} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="string" name='surname' value={formData.surname} onChange={handleInputChange}  placeholder={promoter.surname} />
                    </Form.Group>
                    <Form.Group className="mb-3"  controlId="formDateOfBirth">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name='dateOfBirth' value={formData.dateOfBirth} onChange={handleInputChange} placeholder={promoter.dateOfBirth}/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload New Profile Picture</Form.Label>
                        <Form.Control type="file" name='avatar' placeholder={formData.avatar} onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            *File must be in JPEG or PNG format
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3"  controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' value={formData.email} onChange={handleInputChange} placeholder={promoter.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3"  controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={formData.password} onChange={handleInputChange} placeholder={promoter.password} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                {/* <p>name : {promoter.name}</p> */}
                </Col>
            </Row>
        </Container>
        )
    );

}