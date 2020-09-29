import React from 'react';
import UserForm from './common/UserForm';
import { postUser } from '../slices/users';
import { useDispatch } from 'react-redux';

const NewUser = (props) => {

    const dispatch = useDispatch();
    
    const sendData = (formData)=>{
        dispatch(postUser(formData));
    }

    return(
        <UserForm heading="Create New User" buttonText="Create" sendData={sendData} />
    );
}
 
export default NewUser;