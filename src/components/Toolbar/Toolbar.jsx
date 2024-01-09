import { Container } from 'react-bootstrap';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Calendar3, PeopleFill, PlusCircle } from 'react-bootstrap-icons';
import { useAuth } from '../../context/activeUser';
import { useNavigate } from 'react-router-dom';


export default function ToolBar( {promoterId}) {

    console.log(promoterId);

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    console.log('stato isLoggedIn =' + isLoggedIn)

    const handleNavigate = (path) => {
        navigate(path);
    };

  return isLoggedIn ? (
    <Container
      fluid
      className={cn(styles.toolbar, 'd-flex', 'bg-primary', 'fixed-bottom', 'align-items-center', 'text-white', 'justify-content-evenly')}
    >
      <Calendar3 onClick={() => handleNavigate('/')} />
      <PlusCircle className={cn(styles.plus)} onClick={() => handleNavigate('/events/create')}/>
      <PeopleFill />
    </Container>
  ) : null;
}
