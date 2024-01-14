import { useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



export default function SingleClient({client}){

    return (
      <Link to={`/clients/${client._id}`}>
      <ListGroup.Item className='d-flex justify-content-between align-items-center'>
        <p>{client.name} {client.surname}</p>
      </ListGroup.Item>
      </Link>
    )

}