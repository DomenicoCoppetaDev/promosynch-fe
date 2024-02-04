import { useEffect, useState } from "react";
import { Container, Row, Spinner} from "react-bootstrap";
import { toast } from "react-toastify";
import styles from './styles.module.scss';
import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import HappeningsArea from '../Happenings/HappeningsArea.jsx';
import MyCalendar from "../Calendar/Calendar.jsx";
import useJwt from "../../hook/useJwt.js";

export default function Dashboard() {

  const [happeningsDash,  setHappeningsDash] = useState([]);

  const { promoterId, token } = useJwt();

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
    }, [promoterId]);

    return (
        <Container className="mt-3">
          <Row >
                <MyCalendar events={happeningsDash}/>
          </Row>
            <Row>
                <HappeningsArea happenings={happeningsDash} />
            </Row>
      </Container>
    );
}