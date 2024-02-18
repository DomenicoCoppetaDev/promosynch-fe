import { Container, Row, Col } from "react-bootstrap";
import ClientsArea from './ClientsArea.jsx';
import useJwt from "../../hook/useJwt.js";




export default function Clients() {
  
  const { promoterId, token} = useJwt();

    return (
        <Container className='my-5 rounded shadow pb-3'>
            <Row>
                <ClientsArea />
            </Row>
      </Container>
    );
}