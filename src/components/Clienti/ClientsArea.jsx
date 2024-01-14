import React from 'react';
import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ClientsList from "./ClientsList.jsx";
import { Col } from "react-bootstrap";


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
        <Col className="text-center py-3 px-3">
            <h4>Your Clients</h4>
            <ClientsList clientsToShow={clients}/>
        </Col>
    )
}
