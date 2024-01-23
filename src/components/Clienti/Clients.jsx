import { Container, Row, Spinner } from "react-bootstrap";
import ClientsArea from './ClientsArea.jsx';
import useJwt from "../../hook/useJwt.js";


export default function Clients() {
  
  const { promoterId, token} = useJwt();

    return (
        <Container>
            <Row>
                <ClientsArea />
            </Row>
      </Container>
    );
}