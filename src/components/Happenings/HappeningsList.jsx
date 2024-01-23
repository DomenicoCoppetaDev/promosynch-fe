import { ListGroup } from 'react-bootstrap'
import SingleHappening from './SingleHappening';

export default function HappeningsList({ happeningsToShow }) {

  return (

  <ListGroup className="mt-2">
    {happeningsToShow.map((happening) => (
      <SingleHappening happening={happening} key={happening._id}/>
    ))}
  </ListGroup>
  )
}


