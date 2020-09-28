import React from 'react';
import UserForm from './common/UserForm';

const NewUser = (props) => {
    return(
        <UserForm heading="Create New User" buttonText="Create" fetchData={()=>{}} method="POST" path="http://localhost:3000/users.json" />
    );
}
 
export default NewUser;