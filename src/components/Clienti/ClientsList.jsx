import { ListGroup } from 'react-bootstrap'
import SingleClient from './SingleClient.jsx';

export default function ClientsList({ clientsToShow }) {
  return (

  <ListGroup className="mt-2">
    {clientsToShow.map((client) => (
      <SingleClient client={client} key={client._id}/>
    ))}
  </ListGroup>
  )
}
