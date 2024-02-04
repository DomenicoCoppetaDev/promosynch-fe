import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas }from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Navbarps({theme, setTheme}) {
  const navigate = useNavigate();
  const promoterId = localStorage.getItem('promoterId');
  const token = localStorage.getItem('token');


  if (token == null ) {
    return null ;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    alert('Successfully logged out');
  };

  return (
    <>
          <Navbar collapseOnSelect expand="lg" className={`
              ${theme === 'light' ? 'bg-light border-bottom' : 'bg-dark border-bottom border-light'}`}
                variant={theme}>
            <Container>
              <Navbar.Brand href="#home">Promosynch</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav className='text-end'>
                  <Nav.Link href={`/promoters/${promoterId}`}>Profile</Nav.Link>
                  <Nav.Link onClick={handleLogout} href={`/`}>Logout</Nav.Link>
                  <div className='text-end'>
                  <Button
                    className='rounded-circle'
                    variant = {theme === 'dark' ? 'dark' : 'light'}
                    type="button"
                    id="theme-switch"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >{theme === 'light' ? <i className="bi bi-moon-stars-fill"></i>  : <i className="bi bi-brightness-high-fill"></i>}
                  </Button>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    </>
  );
}
