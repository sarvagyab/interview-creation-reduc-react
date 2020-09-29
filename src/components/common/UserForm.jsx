import React, { useState, Fragment, useEffect } from 'react';
import {Input,Button} from './Input'
import Heading from './Heading'
import Notification from './Notification'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, usersSelector } from '../../slices/users';

const UserForm = (props) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [userSet,setUserset] = useState(false);
    const [errors,setErrors] = useState([]);
    const [notice,setNotice] = useState();
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const {users:allUsers} = useSelector(usersSelector);

    useEffect(()=>{
        if(props.buttonText === 'Edit'){
            console.log('id - ',id);
            dispatch(fetchUsers());
        }
        // props.fetchData({setName,setEmail});
    },[]);

    if(props.buttonText === 'Edit' && !userSet && allUsers[id]){
        setName(allUsers[id].name);
        setEmail(allUsers[id].email);
        setUserset(true);
    }
    
    const handleChange = ({currentTarget})=>{
        if(currentTarget.name === 'name')setName(currentTarget.value);
        else if(currentTarget.name === 'email')setEmail(currentTarget.value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log('Submitted');

        const FD = new FormData();
        FD.set('name',name);
        FD.set('email',email);
        props.sendData(FD);
    }

    // async function sendData(FD){
    //     const response = await fetch(props.path, {
    //         method: props.method,
    //         body: FD
    //     });
    //     const json = await response.json();
    //     console.log(json);
    //     if(json.errors)
    //         setErrors(json.errors)
    //     else setErrors([]);
        
    //     if(json.notice)
    //         setNotice(json.notice)
    //     else setNotice('');
    // }
    
    return ( 
        <Fragment>
            <Heading text={props.heading} />
            <form onSubmit={handleSubmit}>
                <Notification notice={notice} errors={errors} />
                <Input name="name" label="Name" placeholder="Full Name" type="text" value={name} onChange={handleChange} />
                <Input name="email" label="Email" placeholder="Email Address" type="text" value={email} onChange={handleChange} />
                <Button text={props.buttonText} />
            </form>
        </Fragment>
     );
}
 
export default UserForm;