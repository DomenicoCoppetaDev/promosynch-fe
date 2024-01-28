import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useTheme from '../../hook/useTheme';
import { CheckCircleFill } from 'react-bootstrap-icons';




export default function SingleClient({client}){
  const { theme } = useTheme();

    return (
      <Link to={`/clients/${client._id}`}>
      <ListGroup.Item className='d-flex bg-transparent justify-content-evenly align-items-center'>
          <span>{client.name}</span><span>{client.surname}</span><span>{client.email}</span><Button><CheckCircleFill /></Button>
      </ListGroup.Item>
      </Link>
    )

}