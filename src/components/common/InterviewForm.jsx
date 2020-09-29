import React, { useState, Fragment, useEffect, useRef } from 'react';
import {Input,Button,Selection} from './Input'
import Heading from './Heading'
import Notification from './Notification'
import { useParams} from 'react-router-dom'
import Parser from '../../utilities/parser'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, usersSelector } from '../../slices/users';
import { fetchInterviewFull, interviewFullSelector } from '../../slices/interviewFull';


const InterviewForm = (props) => {

    // Form States
    const [designation,setDesignation] = useState('');
    const [startDate,setStartDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');
    const [interviewee,setInterviewee] = useState('');
    const [resume,setResume] = useState({});
    const [interviewers,setInterviewers] = useState([]);
    const [usersList,setUsersList] = useState([]);
    const [interviewSet,setInterviewSet] = useState(false);
    const [listSet,setListSet] = useState(false);
    const fileInput = useRef(null);

    // Old Errors States
    const [errors,setErrors] = useState([]);
    const [notice,setNotice] = useState();

    const {id} = useParams(); //id of page

    const dispatch = useDispatch();
    const {users:Users} = useSelector(usersSelector);
    const {interviewFull:allInterviewDetails} = useSelector(interviewFullSelector);

    // console.log('interviewDetails - ',allInterviewDetails)
    // console.log('Users - ',Users)
    
    useEffect(()=>{
        dispatch(fetchUsers());
        if(props.buttonText === 'Edit'){
            console.log('id - ',id);
            dispatch(fetchInterviewFull(id));
        }
        // props.fetchData({setUsersList,setInterviewee,setInterviewers,setDesignation,setStartDate,setStartTime,setEndTime});
    },[]);
    
    if(usersList.length === 0 && !listSet && Users && Object.keys(Users).length>0){
        setUsersList(Object.values(Users));
        setInterviewee(Object.values(Users)[0].id)
        setListSet(true);
    }
    
    if(props.buttonText === 'Edit' && !interviewSet && allInterviewDetails[id]){
        const interviewDetails = allInterviewDetails[id];
        setInterviewee(interviewDetails.interview.user_id);
        setInterviewers(interviewDetails.interviewers.map(interviewer => interviewer.id));
        setDesignation(interviewDetails.interview.name);
        setStartDate(Parser.parseDate(interviewDetails.interview.start_time));
        setStartTime(Parser.parseTime(interviewDetails.interview.start_time));
        setEndTime(Parser.parseTime(interviewDetails.interview.end_time));
        setResume({link:interviewDetails.resume,fileName:interviewDetails.interview.resume_file_name});
        setInterviewSet(true);
    }
    
    
    const handleChange = ({currentTarget})=>{
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
        props.sendData(FD);
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
                {props.buttonText === 'Edit'?<div className="form-group row">
                    <label className="col-sm-2 col-form-label">Current Resume</label> 
                    <div className="col-sm-10">
                       {(resume && resume.link)?(<a href={resume.link}>{resume.fileName}</a>):"No Resume Currently Provided"}
                    </div>
                </div>:''}
                
                <Input name="resume" label="Upload Resume" type="file" accept="application/pdf" reference={fileInput} />
                <Selection multiple={true} list={usersList} name="interviewers" propertyName="name" id="id" label="Interviewers" onChange={handleChange} value={interviewers}/>
                <Button text={props.buttonText} />
            </form>
        </Fragment>
     );
}
 
export default InterviewForm;