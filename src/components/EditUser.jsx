import React from 'react';
import UserForm from './common/UserForm';
import {useParams} from 'react-router-dom';
import GET from '../utilities/GET';

const EditUser = (props) => {

    const {id} = useParams();

    const fetchData = async ({setName,setEmail})=>{
        let user = await GET(`http://localhost:3000/users/${id}.json`);
        setName(user.name);
        setEmail(user.email);
    }

    return(
        <UserForm heading="Edit User" buttonText="Edit" fetchData={fetchData} method="PATCH" path={`http://localhost:3000/users/${id}.json`} />
    );
}
 
export default EditUser;