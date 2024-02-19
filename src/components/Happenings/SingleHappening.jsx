import { ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import cn from 'classnames';
import moment from 'moment';
import useTheme from '../../hook/useTheme.js';

export default function SingleHappening({ happening }) {

    const { theme } = useTheme();

    return (
        <Link className='happening' to={`/events/${happening._id}`}>
            <ListGroup.Item className={`
              ${theme === 'light' ? 'bg-white  border mx-0' : 'bg-dark text-white border-light'}`}>
                <Row>
                    <Col className=''>
                        <p className='m-2 d-block text-start'>{happening.title}</p>
                    </Col>
                    
                    <Col>
                        <p className='m-2 d-block text-center'>{happening.clients.length}</p>
                    </Col>
                    <Col>
                        <p className='m-2 d-block text-end'>{moment(happening.start).format('HH:mm DD/MM/YYYY')}</p>
                    </Col>
                </Row>
            </ListGroup.Item>
        </Link>
    )
}
