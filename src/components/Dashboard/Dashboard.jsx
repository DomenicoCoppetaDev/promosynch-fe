import { useEffect, useState } from "react";
import { Container, Row, Spinner} from "react-bootstrap";
import { toast } from "react-toastify";
import styles from './styles.module.scss';
import cn from 'classnames';
import { useParams, useNavigate } from "react-router-dom";
import HappeningsArea from '../Happenings/HappeningsArea.jsx';
import MyCalendar from "../Calendar/Calendar.jsx";
import useJwt from "../../hook/useJwt.js";

export default function Dashboard({theme}) {

  const navigate = useNavigate();
  const [happeningsDash,  setHappeningsDash] = useState([]);

  const { promoterId, token } = useJwt();

  useEffect(() => {
    fetch ( 'http://localhost:3031/events/promoter/'+ promoterId, {
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
    }, [promoterId]);

    return (
        <Container className="mt-3" style={{ minHeight: '100vh',}}>
          <Row >
                <MyCalendar events={happeningsDash}/>
          </Row>
            <Row>
                <HappeningsArea happenings={happeningsDash} />
            </Row>
      </Container>
    );
}