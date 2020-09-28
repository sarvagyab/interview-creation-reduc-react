import React, { useState, Fragment, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import GET from '../utilities/GET';
import Parser from '../utilities/parser'
import InterviewForm from './common/InterviewForm';


const EditInterview = (props) => {

    let {id} = useParams();

    const fetchData = async ({setUsersList,setInterviewee,setInterviewers,setDesignation,setStartTime,setStartDate,setEndTime})=>{
        let usersList = await GET(`http://localhost:3000/users.json`);
        let interviewDetails = await GET(`http://localhost:3000/interviews/${id}.json`);
        
        setUsersList(usersList);

        setInterviewee(interviewDetails.interview.user_id);
        setInterviewers(interviewDetails.interviewers.map(interviewer => interviewer.id));
        setDesignation(interviewDetails.interview.name);
        setStartDate(Parser.parseDate(interviewDetails.interview.start_time));
        setStartTime(Parser.parseTime(interviewDetails.interview.start_time));
        setEndTime(Parser.parseTime(interviewDetails.interview.end_time));
    }

    return(
        <InterviewForm fetchData={fetchData} method="PATCH" path={`http://localhost:3000/interviews/${id}.json`} />
    );
}
 
export default EditInterview;