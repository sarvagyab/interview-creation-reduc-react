import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'

const Actions = (props) => {
    const path = `/${props.path}/${props.id}`;
    const editPath = `/${props.path}/${props.id}/edit`;
    return ( 
        <Fragment>
            <Link to={path}> Show </Link> 
            <Link to={editPath}> Edit </Link> 
            <Link to={path}> Delete </Link>
        </Fragment>
    );
}
 
export default Actions;