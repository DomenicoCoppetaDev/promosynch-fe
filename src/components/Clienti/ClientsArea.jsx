import React from 'react';
import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ClientsList from "./ClientsList.jsx";
import ClientsDropdownFilter from './ClientsDropdownFilter.jsx';
import { Col, Row } from "react-bootstrap";


export default function ClientsArea() {

const { id } = useParams();
const [clients,  setClients] = useState([]);

const promoterId = localStorage.getItem('promoterId');
const token = localStorage.getItem('token');

const navigate = useNavigate();

useEffect(() => {
    if (!promoterId || !token) {
        navigate('/');
    }
  }, []);

useEffect(() => {
        fetch ( 'http://localhost:3031/clients/promoter/'+ promoterId, {
            method: 'GET',
            redirect: 'follow'
           })
        .then((r) => {
            if (!r.ok) throw new Error('No Clients Found');
            return r.json();
        })
        .then((data) => {
            setClients(data);
        })
        .catch((error) => {
            toast.error(error.message);
            console.error(error);
          });
        }, [id]);


    return (
        <>
        <Row>
        <h4>Your Clients</h4>
        </Row>
        <Row>
            <ClientsDropdownFilter />
        </Row>
        <Row>
            <Col className="text-center py-3 px-3">
                <ClientsList clientsToShow={clients}/>
            </Col>
        </Row>
        </>
    )

}
