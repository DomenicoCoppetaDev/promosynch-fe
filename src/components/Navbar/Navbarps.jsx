import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas }from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { toast } from "react-toastify";

export default function Navbarps({theme, setTheme}) {
  const navigate = useNavigate();
  const promoterId = localStorage.getItem('promoterId');
  const token = localStorage.getItem('token');


  if (!token) {
    return null ;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    alert('Successfully logged out');
  };

  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className={`
        ${theme === 'light' ? 'bg-light border-bottom' : 'bg-dark border-bottom border-light'}`}
        variant={theme}>
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
                  <Nav.Link onClick={handleLogout} href={`/`}>Logout</Nav.Link>
                  <Nav.Link href={`/`}>Login</Nav.Link>
                  <Nav.Link href={`/clients`}>Clients</Nav.Link>
                  <Nav.Link href={`/promoters/${promoterId}/dashboard`}>Dashboard</Nav.Link>
                  <Nav.Link href="/events/create">Create Event</Nav.Link>
                  <Nav.Link href={`/promoters/${promoterId}`}>Profile</Nav.Link>
                </Nav>
                <Button
                className='rounded-circle'
                variant = {theme === 'dark' ? 'dark' : 'light'}
                type="button"
                id="theme-switch"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >{theme === 'light' ? <i className="bi bi-moon-stars-fill"></i>  : <i className="bi bi-brightness-high-fill"></i>}
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
