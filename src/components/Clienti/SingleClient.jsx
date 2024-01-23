import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useTheme from '../../hook/useTheme';




export default function SingleClient({client}){
  const { theme } = useTheme();

    return (
      <Link to={`/clients/${client._id}`}>
      <ListGroup.Item className='d-grid bg-transparent justify-content-between align-items-center text-start'>
          <p>{client.name} {client.surname} {client.email}</p>
      </ListGroup.Item>
      </Link>
    )

}