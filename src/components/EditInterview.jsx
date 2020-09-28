import React, { useState, Fragment, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import GET from '../utilities/GET';
import Parser from '../utilities/parser'
import InterviewForm from './common/InterviewForm';


const EditInterview = (props) => {

    let {id} = useParams();
    const resume = {};

    // ${
    //     interviewDetails.resume?`Uploaded Resume - <a href="${interviewDetails.resume}">${interviewDetails.interview.resume_file_name}</a>`:"No Resume Currently Provided"
    // }

    const fetchData = async ({setUsersList,setInterviewee,setInterviewers,setDesignation,setStartTime,setStartDate,setEndTime})=>{
        let usersList = await GET(`http://localhost:3000/users.json`);
        let interviewDetails = await GET(`http://localhost:3000/interviews/${id}.json`);
        
        resume.link = interviewDetails.resume;
        resume.fileName = interviewDetails.interview.resume_file_name;

        setUsersList(usersList);

        setInterviewee(interviewDetails.interview.user_id);
        setInterviewers(interviewDetails.interviewers.map(interviewer => interviewer.id));
        setDesignation(interviewDetails.interview.name);
        setStartDate(Parser.parseDate(interviewDetails.interview.start_time));
        setStartTime(Parser.parseTime(interviewDetails.interview.start_time));
        setEndTime(Parser.parseTime(interviewDetails.interview.end_time));
    }

    return(
        <InterviewForm heading="Edit Interview" buttonText="Edit" resume={resume} fetchData={fetchData} method="PATCH" path={`http://localhost:3000/interviews/${id}.json`} />
    );
}
 
export default EditInterview;