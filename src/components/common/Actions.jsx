import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import Delete from './Delete';

const Actions = (props) => {
    const path = `/${props.path}/${props.id}`;
    const editPath = `/${props.path}/${props.id}/edit`;
    const deletePath = `http://localhost:3000/interviews/${props.id}.json`;
    return ( 
        <Fragment>
            <Link to={path}> Show </Link> 
            <Link to={editPath}> Edit </Link> 
            <Delete to="/interviews" request={deletePath} setNotification={props.setNotification}/>
        </Fragment>
    );
}
 
export default Actions;