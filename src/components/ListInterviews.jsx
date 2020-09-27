import React, { useState, useEffect } from 'react';
import GET from '../utilities/GET';
import InterviewShort from './common/InterviewShort';
import ListHeader from './common/ListHeader';
import Heading from './common/Heading';


function ListInterviews(props) {
    const [Interviews, setInterviews] = useState([]);
    const [Interviewees, setInterviewees] = useState({});

    useEffect(() => {
        async function fetchInterviews() {
            let interviews = await GET(`http://localhost:3000/interviews.json/`);
            let interviewees = {};
            for (let i = 0; i < interviews.length; i++) {
                if (!interviewees[interviews[i].user_id]) {
                    interviewees[interviews[i].user_id] = await GET(`http://localhost:3000/users/${interviews[i].user_id}.json`);
                }
            }
            setInterviewees(interviewees);
            setInterviews(interviews);
        }
        fetchInterviews();
    },[]);

    const count = Interviews.length;

    if (count === 0)
        return <p>There are no interviews in the database</p>
    
    

    return (
        <div>
            <Heading text={count + " Interview" + (count !== 1 ? 's' : '')} />
            <table className="table">
                <ListHeader headers={["Designation","Interviewee Name","Date","Timings","Actions"]} />
                <tbody>
                    {Interviews.map(interview => <InterviewShort key={interview.id} interview={interview} Interviewees={Interviewees} />)}
                </tbody>
            </table>
        </div>
    );

}

export default ListInterviews;