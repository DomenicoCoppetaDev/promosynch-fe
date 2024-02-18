import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useJwt from "../../hook/useJwt";
import styles from './styles.module.scss';
import cn from 'classnames';

export default function UpdatePromoter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { promoterId, token } = useJwt();

  const handleCancel = () => {
    navigate(`/promoters/${promoterId}`);
  };

  const [promoter, setPromoter] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    avatar: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
  });

  useEffect(() => {
    
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/${promoterId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((r) => {
        if (!r.ok) throw new Error('Promoter Not Found');
        return r.json();
      })
      .then((promoter) => {
        setPromoter(promoter);
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
      avatar: file,
    });
  };

  
  const updateAvatar = async (e) => {
    e.preventDefault();
  
    try {
      const formDataObj = new FormData();
      formDataObj.append('avatar', formData.avatar);
  
      const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/${id}/profpic`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });
  
      if (response.ok) {
        const updatedPromoterResponse = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/${promoterId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (updatedPromoterResponse.ok) {
          const updatedPromoterData = await updatedPromoterResponse.json();
          setPromoter(updatedPromoterData);
          toast.success('Profile picture successfully updated');
          navigate(`/promoters/${id}`);
        } else {
          const errorData = await updatedPromoterResponse.json();
          toast.error(errorData.error || 'Failed to fetch updated profile');
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Update failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  


  const updatePromoter = async (e) => {
    e.preventDefault();
  
    const updatedData = {};
    let formChanged = false;
  
    for (const key in formData) {
      if (formData[key] !== promoter[key]) {
        updatedData[key] = formData[key];
        formChanged = true;
      }
    }
  
    if (!formChanged) {
      toast.success('Profile is up to date.');
      navigate(`/promoters/${id}`);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/${id}/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        navigate(`/promoters/${id}`);
        toast.success('Profile successfully updated');
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCredentials = async (e) => {
    e.preventDefault();
  
    const updatedData = {};
    let formChanged = false;
  
    for (const key in formData) {
      if (formData[key] !== promoter[key]) {
        updatedData[key] = formData[key];
        formChanged = true;
      }
    }
  
    if (!formChanged) {
      toast.success('Profile is up to date.');
      navigate(`/promoters/${id}`);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/${id}/credentials`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        navigate(`/promoters/${id}`);
        toast.success('Profile successfully updated');
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    promoter && (
      <Container className='p-3 pb-5 my-5'>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
          <div className="d-flex justify-content-evenly">
            <div className={cn(
              styles.profilePicDiv,
              'rounded-circle mb-3 me-3')}>
              {promoter.avatar && <Image className={cn(styles.profilePic)} src={promoter.avatar} alt="Promoter Avatar" />}
            </div>
          </div>
            <Form onSubmit={updateAvatar} className="my-2">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload New Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                />
                <Form.Text className="text-muted">
                  *File must be in JPEG or PNG format
                </Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-evenly">
              <Button className="buttonPrimary" type="submit">
                Update Avatar
              </Button>
              </div>
            </Form>
            <Form onSubmit={updatePromoter}  className="my-3">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter New Name</Form.Label>
                <Form.Control
                  type="string"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={promoter.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Enter New Surname</Form.Label>
                <Form.Control
                  type="string"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  placeholder={promoter.surname}
                />
              </Form.Group>
              <div className="d-flex justify-content-evenly">
                <Button className="buttonPrimary" type="submit">
                  Update Info
                </Button>
              </div>
            </Form>
            <Form onSubmit={updateCredentials} className="my-3">
              <Form.Group className="mb-3" controlId="formBasicOldPassword">
                <Form.Label>Enter Old Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNewPassword">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newEmail">
                <Form.Label>Enter New Email</Form.Label>
                <Form.Control
                  type="email"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-evenly">
                <Button className="buttonPrimary" type="submit">
                  Update Credentials
                </Button>
              </div>
              <div className="d-flex justify-content-evenly my-4">
                <Button variant="danger" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  );
}
