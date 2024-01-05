import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";

export default function ProfilePromoter() {
  const { id } = useParams();
  const [promoter, setPromoter] = useState();

  useEffect(() => {
    console.log(id);
    const endPoint = 'http://localhost:3031/promoters/' + id;
    console.log(endPoint);
    fetch(endPoint, {
      method: 'GET',
      redirect: 'follow'
    })
      .then((r) => {
        if (!r.ok) throw new Error('Promoter Not Found');
        return r.json();
      })
      .then((data) => {
        // Modifica la data di nascita nel formato desiderato
        data.dateOfBirthFormatted = formatDate(data.dateOfBirth);

        setPromoter(data);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  }, [id]);

  // Funzione per formattare la data nel formato gg-mm-aaaa
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

    return (
        promoter && (
        <Container>
            <Row>Promoter Info</Row>
            <Row>
                <Col xs={12} md={4}>
                    {promoter.avatar && <Image className='rounded-circle' src={promoter.avatar} alt="Promoter Avatar" />}
                </Col>
                <Col xs={12} md={8}>
                    <p>Name: {promoter.name}</p>
                    <p>Surname: {promoter.surname}</p>
                    <p>Birth Date: {promoter.dateOfBirthFormatted}</p>
                    <p>Email: {promoter.email}</p>
                </Col>
            </Row>
        </Container>
        )
    );
}

