
import { useEffect, useState } from "react";
import { Button, Col, Container, Card, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams, Form } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";
import styles from './styles.module.scss';
import cn from 'classnames';
import useJwt from '../../hook/useJwt.js';

export default function ProfilePromoter() {
  const { id } = useParams();
  const [promoter, setPromoter] = useState();
  const navigate = useNavigate();
  const { promoterId, token } = useJwt();
  const handleNavigate = (path) => {
    navigate(path);
  };
  

  //data format
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


  //delete promoter profile
  function deletedPromoter() {
    const userConfirmed = window.confirm('Do you really want to delete your profile?');

  if (!userConfirmed) {
    return;
  }

    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/promoters/${promoterId}`,{
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((r)=> {
      if (r.ok) {
        toast.info('Profile deleted successfully');
        localStorage.clear();
        localStorage.setItem('theme','light')
        navigate(`/`)
      } else {
        toast.error('Something went wrong');
      }
    })
    .catch((error) => {
      toast.error(error.message);
      console.error(error);
    });
  }


  return (
    promoter && (
    <Container className='p-3' style={{ minHeight: '100vh',}}>
        <Row className="m-5 justify-content-md-center">
          <Col xs={12} md={6} className='px-0 me-5'>
          <div className="d-flex justify-content-evenly">
            <div className={cn(
              styles.profilePicDiv,
              'rounded-circle mb-3 me-3')}>
              {promoter.avatar && <Image className={cn(styles.profilePic)}src={promoter.avatar} alt="Promoter Avatar" />}
            </div>
            </div>
              <p>Name: {promoter.name}</p>
              <p>Surname:  {promoter.surname}</p>
              <p>Email:  {promoter.email}</p>
          </Col>
        </Row>
        <Row className="text-center my-2">
          <Col>
              <Button onClick={() => handleNavigate(`/promoters/${id}/update`)}>Edit Profile <PencilSquare /></Button>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
              <Button variant="danger" onClick={deletedPromoter}>Delete Profile</Button>    
          </Col>
        </Row>
    </Container>
    )
    );
  }
  