import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas }from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Navbarps() {

  const id = localStorage.promoterId

  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Promosynch</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Header >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href={`/promoters/${id}/dashboard`}>Dashboard</Nav.Link>
                  <Nav.Link href="/events/create">Create Event</Nav.Link>
                  <Nav.Link href={`/promoters/${id}`}>Profile</Nav.Link>
                  
                  <Nav.Link href="#action2">Manage Clients</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
