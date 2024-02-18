import { useEffect, useState } from "react";
import { Container, Row, Button, Col} from "react-bootstrap";
import { toast } from "react-toastify";
import { PlusCircle} from 'react-bootstrap-icons';
import HappeningsArea from '../Happenings/HappeningsArea.jsx';
import MyCalendar from "../Calendar/Calendar.jsx";
import useJwt from "../../hook/useJwt.js";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const [happeningsDash,  setHappeningsDash] = useState([]);

  const { promoterId, token } = useJwt();
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };


  useEffect(() => {
    fetch ( `${process.env.REACT_APP_BACKEND_ENDPOINT}/events/promoter/`+ promoterId, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
      }
       })
    .then((r) => {
        if (!r.ok) throw new Error('No Events Found');
        return r.json();
    })
    .then((happeningsDash) => {
        setHappeningsDash(happeningsDash);
    })
    .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
    }, [promoterId,token]);

    return (
        <Container className='my-5 rounded shadow p-3'>
          <Row className="my-5">
                <MyCalendar events={happeningsDash}/>
          </Row>
            <Row>
                <HappeningsArea happenings={happeningsDash} />
            </Row>
            <Row className="justify-content-center my-3">
              <Col className="d-flex justify-content-center">
                <Button className="buttonPrimary" onClick={() => handleNavigate('/events/create')}><PlusCircle /> Add Event</Button>
              </Col>
            </Row>
      </Container>
    );
}