import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import HappeningsList from "./HappeningsList";
import { Col } from "react-bootstrap";


export default function HappeningsArea() {

const { id } = useParams();
const [happenings,  setHappenings] = useState([]);


useEffect(() => {
        fetch ( 'http://localhost:3031/events/promoter/'+ id, {
            method: 'GET',
            redirect: 'follow'
           })
        .then((r) => {
            if (!r.ok) throw new Error('No Events Found');
            return r.json();
        })
        .then((data) => {
            setHappenings(data);
        })
        .catch((error) => {
            toast.error(error.message);
            console.error(error);
          });
        }, [id]);


    return (
        <Col className="text-center py-3 px-3">
            <h4>Your Events</h4>
            <HappeningsList happeningsToShow={happenings}/>
        </Col>
    )
}
