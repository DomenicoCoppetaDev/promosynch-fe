import { Button, Container, Nav, Navbar, Image}from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import cn from 'classnames';
import promosynch from '../../Images/promosynchsmall.png';

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
              ${theme === 'light' ? 'bg-light border-bottom mx-0' : 'bg-dark border-bottom border-light mx-0'}`}
                variant={theme} fixed="top">
            <Container fluid className='mx-0'>
            <Navbar.Brand className='p-0' href={'/promoters/:id/dashboard'}>
              <div className='d-flex align-items-center'>
              <div className={cn(styles.logoDiv,'rounded-circle text-center')}><Image className={cn(styles.logoProm)} src={promosynch}/></div>
                Promosynch
              </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                </Nav>
                <Nav>
                <Nav.Link onClick={handleLogout} href={`/`}>Logout</Nav.Link>
                <Nav.Link href={`/promoters/:id`} className='d-md-block d-lg-none'>Profile</Nav.Link>
                <Button
                    className='rounded-circle'
                    variant = {theme === 'dark' ? 'dark' : 'light'}
                    type="button"
                    id="theme-switch"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >{theme === 'light' ? <i className="bi bi-moon-stars-fill"></i>  : <i className="bi bi-brightness-high-fill"></i>}
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    </>
  );
}
