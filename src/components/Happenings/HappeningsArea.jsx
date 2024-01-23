import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import HappeningsList from "./HappeningsList";
import { Col } from "react-bootstrap";


export default function HappeningsArea({happenings}) {


    return (
        <Col className="text-center py-3 px-3">
            <h4>Your Events</h4>
            <HappeningsList happeningsToShow={happenings}/>
        </Col>
    )
}
