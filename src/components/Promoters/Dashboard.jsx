import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import ToolBar from "../Toolbar/Toolbar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import HappeningsArea from '../Happenings/HappeningsArea.jsx';
import { Spinner } from "react-bootstrap";

export default function Dashboard() {
  const { id } = useParams();
  const [promoter, setPromoter] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3031/promoters/' + id, {
      method: 'GET',
      redirect: 'follow'
    })
    .then((r) => {
        if (!r.ok) throw new Error('Promoter Not Found');
        return r.json();
    })
    .then((data) => {
        setPromoter(data);
        setLoading(false); 
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
        setLoading(false);
      });
  }, [id]);

    return (
        <Container>
            <Row>
                <HappeningsArea />
            </Row>
      </Container>
    );
}