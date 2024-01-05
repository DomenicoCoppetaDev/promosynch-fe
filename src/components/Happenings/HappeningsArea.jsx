import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";


export default function HappeningsArea() {

const { id } = useParams();
const [happenings,  setEvents] = useState(); 

useEffect(() => {
        fetch ( `http://localhost:3031/events/?promoterId=${id}`, {
            method: 'GET',
            redirect: 'follow'
           })
        .then((r) => {
            if (!r.ok) throw new Error('No Events Found');
            return r.json();
        })
        .then((data) => {
            setEvents(data);
            console.log(happenings)
        })
        .catch((error) => {
            toast.error(error.message);
            console.error(error);
          });
        }, [id]);


}