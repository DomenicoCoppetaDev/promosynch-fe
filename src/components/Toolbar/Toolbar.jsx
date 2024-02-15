import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Calendar3, PeopleFill, PlusCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';


export default function ToolBar() {



  const promoterId = localStorage.getItem('promoterId');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleNavigate = (path) => {
        navigate(path);
    };
  

  if (!token) {
      return null ;
  }


  return (
      <Container fluid
        className={cn(
          styles.toolbar,
          'position-fixed',
          'd-flex',
          'd-lg-none d-xl-none',
          'fixed-bottom',
          'align-items-center',
          'text-white',
          'justify-content-evenly',
        )}
      >
      <div className='d-flex flex-column text-center align-items-center'>
        <Calendar3 onClick={() => handleNavigate(`/promoters/${promoterId}/dashboard`)} />
        <span>Dashboard</span>
      </div>
      <div className='d-flex flex-column text-center align-items-center'>
        <PlusCircle className={cn(styles.plus)} onClick={() => handleNavigate('/events/create')}/>
        <span>Add Event</span>
      </div>
      <div className='d-flex flex-column text-center align-items-center'>
        <PeopleFill onClick={() => handleNavigate('/clients')} />
        <span>Clients</span>
      </div>
    </Container>
  )
}
