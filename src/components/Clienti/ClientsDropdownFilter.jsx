import { useEffect, useState } from "react";
import { Container, Row, Spinner, DropdownButton, Dropdown} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ClientsDropdownFilter() {
  
  const [ happenings, setHappenings ] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const promoterId = localStorage.getItem('promoterId');
  const token = localStorage.getItem('token');
  
  useEffect(() => {

    fetch ( 'http://localhost:3031/events/promoter/'+ promoterId, {
      method: 'GET',
      redirect: 'follow'
     })
  .then((r) => {
      if (!r.ok) throw new Error('No Events Found');
      return r.json();
  })
  .then((happenings) => {
      setHappenings(happenings);
  })
  .catch((error) => {
      toast.error(error.message);
      console.error(error);
    });
  }, [promoterId]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };



  return (
      <>
      <div>
        <select id="dropdown" variant='primary'>
          <option className="dropdown-item" value='all' href="#">Select Events</option>
        {happenings.map((happening) =>( 
          <option className="dropdown-item" value={happening._id} key={happening._id} href="#">{happening.title}</option>
        ))}
        </select>
      </div>
      </>
    )

}