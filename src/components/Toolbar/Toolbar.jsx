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
          'd-flex',
          'd-lg-none',  
          'bg-primary',
          'fixed-bottom',
          'align-items-center',
          'text-white',
          'justify-content-evenly',
          'mt-5'
        )}
      >
      <Calendar3 onClick={() => handleNavigate(`/promoters/${promoterId}/dashboard`)} />
      <PlusCircle className={cn(styles.plus)} onClick={() => handleNavigate('/events/create')}/>
      <PeopleFill onClick={() => handleNavigate('/clients')} />
    </Container>
  )
}
