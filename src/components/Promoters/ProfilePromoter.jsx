
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
  
  useEffect(() => {
      const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
  
      return `${day}-${month}-${year}`;
    }
    
    fetch(`http://localhost:3031/promoters/${promoterId}`, {
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
        promoter.dateOfBirthFormatted = formatDate(promoter.dateOfBirth);
        setPromoter(promoter);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  }, [id]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    promoter && (
    <Container >
        <Row className='d-flex justify-content-center'>
          <Col xs={12} md={1}>
              {promoter.avatar && <Image className='rounded-circle mb-3' src={promoter.avatar} alt="Promoter Avatar" />}
          </Col >
          <Col xs={6} md={1}>
              <p>Name:</p>
              <p>Surname:</p>
              <p>Birth Date: </p>
              <p>Email:</p>
          </Col>
          <Col xs={6} md={4}>
              <p>{promoter.name}</p>
              <p>{promoter.surname}</p>
              <p>{promoter.dateOfBirthFormatted}</p>
              <p>{promoter.email}</p>
          </Col>
          <Col xs={1} md={1}>
              <Button onClick={() => handleNavigate(`/promoters/${id}/update`)}><PencilSquare /></Button>
          </Col>
        </Row>
    </Container>
    )
);
}