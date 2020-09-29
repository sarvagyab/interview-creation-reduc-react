import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteInterview } from '../../slices/interviews';
import { deleteUser } from '../../slices/users';

const Actions = (props) => {
    const path = `/${props.path}/${props.id}`;
    const editPath = `/${props.path}/${props.id}/edit`;

    const dispatch = useDispatch();
    
    const deleteItem = async (path,id)=>{
        console.log(path,id);
        if(path === 'interviews'){
            dispatch(deleteInterview(id));
        }
        else if(path === 'users'){
            dispatch(deleteUser(id))
        }
    }

    return ( 
        <Fragment>
            <Link to={path}> Show </Link> 
            <Link to={editPath}> Edit </Link> 
            <Link to="#" onClick={()=>deleteItem(props.path,props.id)}>Delete</Link>
            {/* <Delete to="#" request={deletePath} setNotification={props.setNotification}/> */}
        </Fragment>
    );
}
 
export default Actions;