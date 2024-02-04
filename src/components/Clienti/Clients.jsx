import { Container, Row, Col } from "react-bootstrap";
import ClientsArea from './ClientsArea.jsx';
import useJwt from "../../hook/useJwt.js";




export default function Clients() {
  
  const { promoterId, token} = useJwt();

    return (
        <Container style={{ minHeight: '100vh'}}>
            <Row>
                <ClientsArea />
            </Row>
      </Container>
    );
}