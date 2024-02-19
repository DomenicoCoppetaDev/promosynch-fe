import { ListGroup, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useTheme from '../../hook/useTheme';
import { CheckCircleFill } from 'react-bootstrap-icons';




export default function SingleClient({client}){
  const { theme } = useTheme();

    return (
        
        <ListGroup.Item className={`
              ${theme === 'light' ? 'bg-white  border mx-0' : 'bg-dark text-white border-light'}`}>
        <Row>
          <Col xs={3}>
            <p className='m-2'>{client.name}</p>
          </Col>
          <Col xs={3}>
            <p className='m-2'>{client.surname}</p>
          </Col>
          <Col xs={4}>
            <p className='m-2'>{client.email}</p>
          </Col>
          <Col xs={2}>
            <input className='m-2' type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          </Col>
        </Row>
      </ListGroup.Item>
    )

}