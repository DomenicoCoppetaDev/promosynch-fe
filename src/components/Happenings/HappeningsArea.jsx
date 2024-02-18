import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import HappeningsList from "./HappeningsList";
import { Col, Row, Container } from "react-bootstrap";


export default function HappeningsArea({happenings}) {

    console.log(happenings)
    return (
    <Container>
        <Row className='text-center'>
            <Col>
                <h4>Your Events</h4>
            </Col>
        </Row>
        <Row>
            <Col className=''>
             <p className='m-2 d-block text-start ms-5'>Title</p>
            </Col>
            <Col>
                <p className='m-2 d-block text-center'>Attendants</p>
            </Col>
            <Col>
                <p className='m-2 d-block text-end me-5'>Date</p>
            </Col>
        </Row>
        <Row>
            <Col className="text-center px-3">
                <HappeningsList happeningsToShow={happenings}/>
            </Col>
        </Row>
    </Container>
    )
}
