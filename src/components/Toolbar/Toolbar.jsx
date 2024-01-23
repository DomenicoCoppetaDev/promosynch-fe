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

  return (
      <Container fluid
        className={cn(
          styles.toolbar,
          'd-sm-flex', 
          'd-md-none',  
          'bg-primary',
          'fixed-bottom',
          'align-items-center',
          'text-white',
          'justify-content-evenly'
        )}
      >
      <Calendar3 onClick={() => handleNavigate(`/promoters/${promoterId}/dashboard`)} />
      <PlusCircle className={cn(styles.plus)} onClick={() => handleNavigate('/events/create')}/>
      <PeopleFill onClick={() => handleNavigate('/clients')} />
    </Container>
  )
}
