import { useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function SingleHappening({happening}){

    return (
      <Link to={`/events/${happening._id}`}>
      <ListGroup.Item className='d-flex justify-content-between align-items-center text-start bg-transparent'>
        <p>{happening.title}</p>
      </ListGroup.Item>
      </Link>
    )

}