import { ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import cn from 'classnames';
import moment from 'moment';

export default function SingleHappening({ happening }) {
    return (
        <Link className={cn(styles.happening)} to={`/events/${happening._id}`}>
            <ListGroup.Item className=''>
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
