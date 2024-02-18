import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Calendar3, PeopleFill, PlusCircle, PersonCircle  } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const promoterId = localStorage.getItem('promoterId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!token) {
    return null;
  }

  return (
    <Container fluid
      className={cn(
        styles.sidebar,
        'position-fixed d-none d-lg-block py-5 fixed-left text-white'
      )}
    >
      <div className={cn(styles.buttons,'d-flex flex-column text-center my-5 align-items-center')}>
        <PersonCircle onClick={() => handleNavigate(`/promoters/${promoterId}`)} />
        <span>Profile</span>
      </div>
      <div className={cn(styles.buttons,'d-flex flex-column text-center my-5 align-items-center')}>
        <Calendar3 onClick={() => handleNavigate(`/promoters/${promoterId}/dashboard`)} />
        <span>Dashboard</span>
      </div>
      <div className={cn(styles.buttons,'d-flex flex-column text-center my-5 align-items-center')}>
        <PlusCircle className={cn(styles.plus)} onClick={() => handleNavigate('/events/create')} />
        <span>Add Event</span>
      </div>
      <div className={cn(styles.buttons,'d-flex flex-column text-center my-5 align-items-center')}>
        <PeopleFill onClick={() => handleNavigate('/clients')} />
        <span>Clients</span>
      </div>
    </Container>
  )
}
