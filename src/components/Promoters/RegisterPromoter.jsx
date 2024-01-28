import { Form, Button, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';


export default function RegisterPromoter() {
    const navigate = useNavigate();
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
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const registerPromoter = async (e) => {
        e.preventDefault();
      
        const defaultAvatar = 'https://res.cloudinary.com/dvof2wzo4/image/upload/v1703698897/promosynch/og9c38jadmll2aupahhw.jpg';

        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        const extension = getExtension(avatar);
        const avatarValue = avatar ? avatar : defaultAvatar;

        if (avatar && (!extension || !allowedExtensions.includes(extension))) {
            toast.error('Invalid Avatar File Format');
            return;
        }

        

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('avatar', avatarValue);

            let response = await fetch(
                'http://localhost:3031/promoters/register',
                {
                    method: 'POST',
                    body: formData,
                }
            )
            if (response.ok) {
                const loginResponse = await fetch(
                    'http://localhost:3031/promoters/session',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    }
                );

                const loginData = await loginResponse.json();

                if (loginData.token) {
                    localStorage.clear();
                    localStorage.setItem('promoterId', loginData.promoterId);
                    localStorage.setItem('token', loginData.token);
                    navigate(`/promoters/${loginData.promoterId}/dashboard`);
                } else {
                    toast.error('Login failed');
                }
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
        <Container className='py-5 mb-5'>
            <Row lg='3' className='justify-content-md-center'>
                <Form onSubmit={registerPromoter}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" name='name' value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control required type="text" name='surname' value={surname} onChange={(e) => { setSurname(e.target.value) }} placeholder="Enter Surname" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDateOfBirth">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control required type="date" name='dateOfBirth' value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" name='avatar' onChange={(e) => { setAvatar(e.target.files[0]) }} />
                        <Form.Text className="text-muted">
                            *File must be in JPEG or PNG format
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                    </Form.Group>
                    <div className='mb-3'>
                        By registering you reading and agreed to the <Link to="/terms">Terms and Conditions</Link>
                    </div>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Row>
        </Container>
    )
}

