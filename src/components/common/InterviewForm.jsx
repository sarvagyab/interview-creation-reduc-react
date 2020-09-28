import React, { useState, Fragment, useEffect, useRef } from 'react';
import {Input,Button,Selection} from './Input'
import Heading from './Heading'
import Notification from './Notification'
import {Link} from 'react-router-dom'


const InterviewForm = (props) => {

    const [designation,setDesignation] = useState('');
    const [startDate,setStartDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');
    const [interviewee,setInterviewee] = useState('');
    const [interviewers,setInterviewers] = useState([]);
    const [usersList,setUsersList] = useState([]);
    const [errors,setErrors] = useState([]);
    const [notice,setNotice] = useState();

    const fileInput = useRef(null);
    
    useEffect(()=>{
        props.fetchData({setUsersList,setInterviewee,setInterviewers,setDesignation,setStartDate,setStartTime,setEndTime});
    },[]);
    
    const handleChange = ({currentTarget})=>{
        // console.log(currentTarget.name,currentTarget.value)
        if(currentTarget.name === 'name')setDesignation(currentTarget.value);
        else if(currentTarget.name === 'start_date')setStartDate(currentTarget.value);
        else if(currentTarget.name === 'start_time')setStartTime(currentTarget.value);
        else if(currentTarget.name === 'end_time')setEndTime(currentTarget.value);
        else if(currentTarget.name === 'interviewee')setInterviewee(currentTarget.value);
        else if(currentTarget.name === 'interviewers')setInterviewers(Array.from(currentTarget.selectedOptions).map(obj=>obj.value));
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log("Submitted");
        const FD = new FormData();
        if(fileInput.current.files.length)
            FD.set('resume',fileInput.current.files[0]);
        FD.set('name',designation);
        FD.set('start_date',startDate);
        FD.set('start_time',startTime);
        FD.set('end_time',endTime);
        FD.set('interviewee',interviewee);
        interviewers.map(interviewer=>FD.append('interviewers[]',interviewer));
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
                <Input name="name" label="Designation" placeholder="Designation" type="text" value={designation} onChange={handleChange} />
                <Input name="start_date" label="Interview Date" type="date" value={startDate} onChange={handleChange} />
                <Input name="start_time" label="Start Time" type="time" value={startTime} onChange={handleChange}/>
                <Input name="end_time" label="End Time" type="time" value={endTime} onChange={handleChange} />
                <Selection multiple={false} list={usersList} name="interviewee" propertyName="name" id="id" label="Interviewee" onChange={handleChange} value={interviewee}/>
                {(props.resume && props.resume.link)
                    ?(
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Current Resume</label> 
                        <div className="col-sm-10">
                            <a href={props.resume.link}>{props.resume.fileName}</a>
                        </div>
                    </div>)
                    :"No Resume Currently Provided"
                }
                <Input name="resume" label="Upload Resume" type="file" reference={fileInput} />
                <Selection multiple={true} list={usersList} name="interviewers" propertyName="name" id="id" label="Interviewers" onChange={handleChange} value={interviewers}/>
                <Button text={props.buttonText} />
            </form>
        </Fragment>
     );
}
 
export default InterviewForm;