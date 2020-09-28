import React, { useState, Fragment, useEffect } from 'react';
import GET from '../utilities/GET';
import {Input,Button,Selection} from './common/Input';
import Heading from './common/Heading';
import Notification from './common/Notification'

const NewInterview = (props) => {


    const [designation,setDesignation] = useState('');
    const [startDate,setStartDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');
    const [interviewee,setInterviewee] = useState('');
    const [interviewers,setInterviewers] = useState([]);
    const [usersList,setUsersList] = useState([]);
    const [errors,setErrors] = useState([]);
    const [notice,setNotice] = useState();
    
    useEffect(()=>{
        async function fetchUsers(){
            let usersList = await GET('http://localhost:3000/users.json');
            setUsersList(usersList);
            setInterviewee(`${usersList[0].id}`)
        }
        fetchUsers();
    },[]);
    
    const handleChange = ({currentTarget})=>{
        console.log(currentTarget.name,currentTarget.value)
        if(currentTarget.name === 'name')setDesignation(currentTarget.value);
        if(currentTarget.name === 'start_date')setStartDate(currentTarget.value);
        if(currentTarget.name === 'start_time')setStartTime(currentTarget.value);
        if(currentTarget.name === 'end_time')setEndTime(currentTarget.value);
        if(currentTarget.name === 'interviewee')setInterviewee(currentTarget.value);
        // console.log((Array.from(currentTarget.selectedOptions).map(obj=>obj.value)))
        if(currentTarget.name === 'interviewers')setInterviewers(Array.from(currentTarget.selectedOptions).map(obj=>obj.value));
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log("Submitted");

        const FD = new FormData();
        FD.set('name',designation);
        FD.set('start_date',startDate);
        FD.set('start_time',startTime);
        FD.set('end_time',endTime);
        FD.set('interviewee',interviewee);
        interviewers.map(interviewer=>FD.append('interviewers[]',interviewer));
        sendData(FD);
    }

    async function sendData(FD){
        const response = await fetch("http://localhost:3000/interviews.json", {
            method: 'POST',
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
            <Heading text="Create a New Interview" />
            <form onSubmit={handleSubmit}>
                <Notification notice={notice} errors={errors} />
                <Input name="name" label="Designation" placeholder="Designation" type="text" value={designation} onChange={handleChange} />
                <Input name="start_date" label="Interview Date" type="date" value={startDate} onChange={handleChange} />
                <Input name="start_time" label="Start Time" type="time" value={startTime} onChange={handleChange}/>
                <Input name="end_time" label="End Time" type="time" value={endTime} onChange={handleChange} />
                <Selection multiple={false} list={usersList} name="interviewee" propertyName="name" id="id" label="Interviewee" onChange={handleChange} value={interviewee}/>
                <Selection multiple={true} list={usersList} name="interviewers" propertyName="name" id="id" label="Interviewers" onChange={handleChange} value={interviewers}/>

                <Button text="Create new Interview" />
            </form>
        </Fragment>
     );
}
 
export default NewInterview;