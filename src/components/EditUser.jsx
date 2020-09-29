import React from 'react';
import UserForm from './common/UserForm';
import {useParams} from 'react-router-dom';
import { updateUser } from '../slices/users';
import { useDispatch } from 'react-redux';

const EditUser = (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const sendData = (formData)=>{
        dispatch(updateUser(formData,id));
    }

    return(
        <UserForm heading="Edit User" buttonText="Edit" sendData = {sendData} />
    );
}
 
export default EditUser;