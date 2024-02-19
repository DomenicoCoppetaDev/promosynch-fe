import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Row, Container, Button } from 'react-bootstrap';
import useJwt from '../../hook/useJwt.js';
import Papa from 'papaparse';
import AgGridExample from './ClientsGrid.jsx';
import ClientsList from './ClientsList.jsx';


export default function ClientsArea() {
  const [clients, setClients] = useState([]);
  const { promoterId, token } = useJwt();
  const [happenings, setHappenings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/events/promoter/${promoterId}`, {
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
    fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/events/clients/${promoterId}`, {
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

  const handleDownloadCSV = () => {
    const csvData = clientsToShow.map((client) => ({
      'Name': client.name,
      'Surname': client.surname,
      'Email': client.email,
      'DateOfBirth': client.dateOfBirth,
      'CheckedIn': client.checkedIn,
      'id': client._id,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'clients.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <Container className='my-2 text-center'>
      <Row className='my-3'> 
        <h4>Your Clients</h4>
      </Row>
      <Row className='justify-content-md-center'>
        <Col>
          <p className='mb-1'>Select Event: </p>
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col>
          <select id="dropdown" variant="primary" onChange={(e) => handleEventSelect(e.target.value)}>
            <option className="dropdown-item" value="all">All</option>
            {happenings.map((happening) => (
              <option className="dropdown-item" value={happening._id} key={happening._id}>
                {happening.title}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row >
          <Col xs={3} className='p-0'>
           <p className='m-2 d-block text-center ms-5'>Name</p>
          </Col>
          <Col xs={3} className='p-0'>
              <p className='m-2 d-block text-center'>Surname</p>
          </Col>
          <Col xs={4} className='p-0'>
              <p className='m-2 d-block text-center'>email</p>
          </Col>
          <Col xs={2} className='p-0'>
              <p className='m-2 d-block text-center me-5'>Checked-In</p>
          </Col>
      </Row>
      <Row>
          <Col>
              <ClientsList clientsToShow={clientsToShow}/>
          </Col>
      </Row>
      {/* <Row>
        <Col className="text-center py-3 px-3">
          <AgGridExample data={clientsToShow}/>
        </Col>
      </Row> */}
      <Row>
        <Col className='text-center py-3 px-3'>
          <Button className='buttonPrimary'  onClick={handleDownloadCSV} >Download CSV</Button>
        </Col>
      </Row>
    </Container>
  );
}
