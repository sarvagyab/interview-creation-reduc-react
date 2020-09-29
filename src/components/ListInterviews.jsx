import React, { useState, useEffect } from 'react';
import GET from '../utilities/GET';
// import ListRow from './common/ListRow';
import ListHeader from './common/ListHeader';
import Heading from './common/Heading';
import Notification from './common/Notification'
import Parser from '../utilities/parser'
import Actions from './common/Actions'
import { connect } from 'react-redux'
import {fetchInterviews} from '../actions/interviewsActions'

function ListInterviews(props) {
    const [Interviews, setInterviews] = useState([]);
    const [Interviewees, setInterviewees] = useState({});
    const [notice, setNotice] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log(props.dispatch);
        props.dispatch(fetchInterviews())
        // async function fetchInterviews() {
        //     let interviews = await GET(`http://localhost:3000/interviews.json/`);
        //     let interviewees = {};
        //     for (let i = 0; i < interviews.length; i++) {
        //         if (!interviewees[interviews[i].user_id]) {
        //             interviewees[interviews[i].user_id] = await GET(`http://localhost:3000/users/${interviews[i].user_id}.json`);
        //         }
        //     }
        //     setInterviewees(interviewees);
        //     setInterviews(interviews);
        // }
        // fetchInterviews();
    }, [props.dispatch]);
    console.log('interviews',props.interviews);

    const count = Interviews.length;
    // if (count === 0)
    //     return <p>There are no interviews in the database</p>

    return (
        <div>
            <Heading text={count + " Interview" + (count !== 1 ? 's' : '')} />
            <Notification notice={notice} errors={errors} />
            <table className="table">
                <ListHeader headers={["Designation", "Interviewee Name", "Date", "Timings", "Actions"]} />
                <tbody>
                    {props.interviews.map(interview => (
                        <tr key={interview.id}>
                            <td>{interview.name}</td>
                            {/* <td>{Interviewees[interview.user_id].name}</td> */}
                            <td>{Parser.parseDate(interview.start_time)}</td>
                            <td>{Parser.parseTime(interview.start_time)} - {Parser.parseTime(interview.end_time)}</td>
                            <td><Actions id={interview.id} path="interviews" setNotification={{ setErrors, setNotice }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}


function mapStateToProps(state){
    return {
    loading: state.interviews.loading,
    interviews: state.interviews.interviews,
    hasErrors: state.interviews.hasErrors,
    }
};

export default connect(mapStateToProps)(ListInterviews);
