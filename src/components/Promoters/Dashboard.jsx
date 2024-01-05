import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import HappeningsArea from '../Happenings/HappeningsArea.jsx';

export default function Dashboard() {
  const { id } = useParams();
  const [promoter, setPromoter] = useState();

  useEffect(() => {
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
        setPromoter(data);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  }, [id]);

    return (
        <Container>
            <Row>Your Events</Row>
            <Row>
                <HappeningsArea />
            </Row>
        </Container>
    );
}

