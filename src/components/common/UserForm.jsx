import React, { useState, Fragment, useEffect } from 'react';
import {Input,Button,Selection} from './Input'
import Heading from './Heading'
import Notification from './Notification'

const InterviewForm = (props) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [errors,setErrors] = useState([]);
    const [notice,setNotice] = useState();
    
    useEffect(()=>{
        props.fetchData({setName,setEmail});
    },[]);
    
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
        sendData(FD);
    }

    async function sendData(FD){
        const response = await fetch(props.path, {
            method: props.method,
            body: FD
        });
        const json = await response.json();
        console.log(json);
        if(json.errors)
            setErrors(json.errors)
        else setErrors([]);
        
        if(json.notice)
            setNotice(json.notice)
        else setNotice('');
    }
    

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
 
export default InterviewForm;