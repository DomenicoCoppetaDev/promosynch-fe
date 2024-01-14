import { useEffect, useState } from "react";
import { Container, Row, Spinner, DropdownButton, Dropdown} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SingleDropdownOption from "./SingleDropdownOption.jsx";


export default function ClientsDropdownFilter() {
  
  const [ happenings, setHappenings ] = useState([]);
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

  return (

      <DropdownButton id="dropdown-basic-button" title="Select Event">
        {happenings.map((happening) =>( 
          <SingleDropdownOption happening={happening} key={happening._id}/>
      ))}
      </DropdownButton>

    )

}