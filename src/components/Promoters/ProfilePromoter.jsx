
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";



export default function ProfilePromoter(){
    const { id } = useParams();
    const navigate = useNavigate();
    console.table({id});

  
    return (
        <>
        </>
    );
}