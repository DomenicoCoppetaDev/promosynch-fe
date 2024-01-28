import React from 'react';
import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ClientsList from "./ClientsList.jsx";
import { Col, Row } from "react-bootstrap";
import useJwt from "../../hook/useJwt.js";



export default function ClientsArea() {

const { id } = useParams();
const [clients,  setClients] = useState([]);
const { promoterId, token } = useJwt();

const [ happenings, setHappenings ] = useState([]);
const [selectedEvent, setSelectedEvent] = useState('all');

const navigate = useNavigate();


// fetch clients
useEffect(() => {
    fetch ( 'http://localhost:3031/events/clients/'+ promoterId, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
       })
    .then((r) => {
        if (!r.ok) throw new Error('No Clients Found');
        return r.json();
    })
    .then((clients) => {
        setClients(clients);
    })
    .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
    }, [id]);

    const clientsToShow = clients.filter((client) => {
      if (selectedEvent === 'all') {
        return true;
      } else {
        return client.happeningId === selectedEvent;
      }
    });
    

      const handleEventSelect = (event) => {
        setSelectedEvent(event);
      };


    console.log(clientsToShow)

    // const csvWriter = create



    return (
        <>
        <Row>
            <h4>Your Clients</h4>
        </Row>
        <Row>
            <div>
                <select id="dropdown" variant='primary' onChange={(e) => handleEventSelect(e.target.value)}>
                    <option className="dropdown-item" value='all' href="#">Select Events</option>
                    {happenings.map((happening) =>( 
                    <option className="dropdown-item" value={happening._id} key={happening._id} href="#">{happening.title}</option>
                    ))}
                </select>
            </div>
        </Row>
        <Row>
            <Col className="text-center py-3 px-3">
                <ClientsList clientsToShow={clientsToShow}/>
            </Col>
        </Row>
        </>
    )

}
