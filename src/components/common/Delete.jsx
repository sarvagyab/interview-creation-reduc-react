import React from 'react';
import {Link} from 'react-router-dom'

const Delete = ({request, to, text,setNotification}) => {
    const handleDelete = async (event) =>{
        const response = await fetch(request, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
        });
        const json = await response.json();
        if(json.errors)
            setNotification.setErrors(json.errors);
        
        if(json.notice)
            setNotification.setNotice(json.notice);
    }

    return ( 
        <Link onClick={handleDelete} to={to || '#'}> {text || 'Delete'} </Link>
    );
}
 
export default Delete;