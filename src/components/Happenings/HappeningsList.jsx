import { ListGroup } from 'react-bootstrap'
import SingleHappening from './SingleHappening.jsx';

export default function HappeningsList ({ happenings }) {
  return (
  <ListGroup className="mt-2">
    {happenings.map((happening) => (
      <SingleHappening happening={happening} key={happenig._id}/>
    ))}
  </ListGroup>
  )
}


