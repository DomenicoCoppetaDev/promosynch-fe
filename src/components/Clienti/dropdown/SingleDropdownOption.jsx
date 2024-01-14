import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function SingleDropdownOption({happening}){
    return (
        <Dropdown.Item value={happening._id} href="#/action-1">{happening.title}</Dropdown.Item>
    )
}