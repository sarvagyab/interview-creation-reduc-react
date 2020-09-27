import React, { useEffect, useState, Fragment } from 'react';
import {useParams} from 'react-router-dom';
import GET from '../utilities/GET';
import Parser from '../utilities/parser';
import Heading from './common/Heading';


const ShowInterview = () => {

    const [interviewDetails,setInterviewDetails] = useState({});
    const {id} = useParams();
    useEffect(()=>{
        async function fetchInterview(){
            let interviewDetails = await GET(`http://localhost:3000/interviews/${id}.json`);
            setInterviewDetails(interviewDetails);
        }
        fetchInterview();
    },[]);

    if(Object.keys(interviewDetails).length === 0)
        return (
            <Fragment>
                <Heading text="Interview Details" />
                <h1>Loading</h1>
            </Fragment>
        );

    return ( 
        <section className="section">
                <Heading text="Interview Details" />
                <strong>Designation - </strong> {interviewDetails.interview.name }<br />
                <strong>Interviewee Name - </strong> {interviewDetails.interviewee.name }
                { interviewDetails.resume?("<strong><a href= " + interviewDetails.resume + ">Resume</a></strong>"):"" }<br />

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