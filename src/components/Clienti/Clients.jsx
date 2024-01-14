import { useEffect, useState } from "react";
import { Container, Row, Spinner, Dropdown, DropdownButton} from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import ClientsArea from './ClientsArea.jsx';
import ClientsDropdownFilter from './dropdown/ClientsDropdownFilter.jsx'


export default function Clients() {
  
//   const [promoter, setPromoter] = useState();
  const navigate = useNavigate();

  
  useEffect(() => {
    const promoterId = localStorage.getItem('promoterId');
    const token = localStorage.getItem('token');
    
    if (!promoterId || !token) {
        navigate('/');
    }
  }, []);

    return (
        <Container>
            <Row>
                <ClientsDropdownFilter />
            </Row>
            <Row>
                <ClientsArea />
            </Row>
      </Container>
    );
}