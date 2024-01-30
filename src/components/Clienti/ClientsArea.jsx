import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClientsList from './ClientsList.jsx';
import { Col, Row, Container } from 'react-bootstrap';
import useJwt from '../../hook/useJwt.js';
import ClientsGrid from './ClientsGrid.jsx';

export default function ClientsArea() {
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const { promoterId, token } = useJwt();

  const [happenings, setHappenings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('all');

  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    fetch('http://localhost:3031/events/promoter/' + promoterId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error('No Events Found');
        return r.json();
      })
      .then((events) => {
        setHappenings(events);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  }, [promoterId, token]);

  // Fetch clients
  useEffect(() => {
    fetch('http://localhost:3031/events/clients/' + promoterId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  }, [promoterId, token]);

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

  return (
    <Container className='my-5 text-center'>
      <Row>
        <h4>Your Clients</h4>
      </Row>
      <Row>
        <div>
          <h6>Select Event: </h6>
          <select id="dropdown" variant="primary" onChange={(e) => handleEventSelect(e.target.value)}>
            <option className="dropdown-item" value="all">
            All
            </option>
            {happenings.map((happening) => (
              <option className="dropdown-item" value={happening._id} key={happening._id}>
                {happening.title}
              </option>
            ))}
          </select>
        </div>
      </Row>
      <Row>
        <Col className="text-center py-3 px-3">
          <ClientsList clientsToShow={clientsToShow} />
        </Col>
      </Row>
    </Container>
  );
}
