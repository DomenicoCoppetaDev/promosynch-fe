import { useEffect, useState } from "react";
import { Container, Row, Spinner} from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import HappeningsArea from './Happenings/HappeningsArea.jsx';

export default function Dashboard() {
  
  // const [promoter, setPromoter] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    const promoterId = localStorage.getItem('promoterId');
    const token = localStorage.getItem('token');
    
    if (!promoterId || !token) {
        navigate('/');
    }

  //   fetch(`http://localhost:3031/promoters/${promoterId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then((r) => {
  //       if (!r.ok) {
  //         if (r.status !== 404){
  //         throw new Error('Promoter Not Found');
  //         }
  //       }
  //       return r.json();
  //   })
  //   .then((promoter) => {
  //       setPromoter(promoter);
  //     })
  //     .catch((error) => {
  //       if (error.message !== 'Promoter Not Found'){
  //         toast.error(error.message);
  //       }
  //       console.error(error);
  //     });
  }, []);

    return (
        <Container>
            <Row>
                <HappeningsArea />
            </Row>
      </Container>
    );
}