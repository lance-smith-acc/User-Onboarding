import React from 'react';
import {CardTitle, CardHeader, ListGroup, ListGroupItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserCard(props){
    return (
    <div id={`${props.id}`}className="mt-1">
        <CardHeader className="m-auto"><CardTitle>{`${props.name}`}</CardTitle></CardHeader>
        <ListGroup>
            <ListGroupItem>Email: {`${props.email}`}</ListGroupItem>
            <ListGroupItem>Password: {`${props.password}`}</ListGroupItem>
            <ListGroupItem>Accepted TOS? ${`${props.tos}`}</ListGroupItem>
        </ListGroup>
    </div>
) 
}

export default UserCard;