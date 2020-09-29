import React, { useEffect, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import Parser from '../utilities/parser';
import Heading from './common/Heading';

import {fetchInterviewFull,interviewFullSelector} from '../slices/interviewFull';
import {useDispatch, useSelector} from 'react-redux';

const ShowInterview = () => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const {interviewFull:allInterviewDetails} = useSelector(interviewFullSelector);
    
    useEffect(()=>{
        dispatch(fetchInterviewFull(id));
    },[dispatch]);

    const interviewDetails = allInterviewDetails[id];
    console.log(allInterviewDetails,'interviewDetails');

    if(!interviewDetails)
        return (
            <Fragment>
                <Heading text="Interview Details" />
                <label>Loading</label>
            </Fragment>
        );

    return ( 
        <section className="section">
                <Heading text="Interview Details" />
                <strong>Designation - </strong> {interviewDetails.interview.name }<br />
                <strong>Interviewee Name - </strong> {interviewDetails.interviewee.name }
                { interviewDetails.resume?(<strong><a href= {interviewDetails.resume}> Resume</a></strong>):"" }<br />

                <strong>Date - </strong> {Parser.parseDate(interviewDetails.interview.start_time)}<br />
                <strong>Timings - </strong> {Parser.parseTime(interviewDetails.interview.start_time)} -  {Parser.parseTime(interviewDetails.interview.end_time)}<br />
                <strong>Interviewers' Names - </strong><br />
                <ul>
                {
                    interviewDetails.interviewers.map(interviewer=>(
                        <li key={interviewer.id}>{interviewer.name}</li>
                    ))
                }
                </ul>
        </section>
     );
}
 
export default ShowInterview;