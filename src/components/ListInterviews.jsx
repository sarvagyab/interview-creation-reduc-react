import React, { useState, useEffect } from 'react';
// import GET from '../utilities/GET';
// import ListRow from './common/ListRow';
import ListHeader from './common/ListHeader';
import Heading from './common/Heading';
import Notification from './common/Notification'
import Parser from '../utilities/parser'
import Actions from './common/Actions'

import {fetchInterviews,interviewsSelector} from '../slices/interviews';
import {fetchUsers,usersSelector} from '../slices/users';
import {useDispatch, useSelector} from 'react-redux';

function ListInterviews(props) {
    const [notice, setNotice] = useState('');
    const [errors, setErrors] = useState([]);
    
    const dispatch = useDispatch();
    const {interviews:Interviews} = useSelector(interviewsSelector);
    const {users:Interviewees} = useSelector(usersSelector);
    
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchInterviews())
    },[]);

    const count = Interviews.length;
    if (count === 0)
        return <p>There are no interviews in the database</p>

    return (
        <div>
            <Heading text={count + " Interview" + (count !== 1 ? 's' : '')} />
            <Notification notice={notice} errors={errors} />
            <table className="table">
                <ListHeader headers={["Designation", "Interviewee Name", "Date", "Timings", "Actions"]} />
                <tbody>
                    {Interviews.map(interview => (
                        <tr key={interview.id}>
                            <td>{interview.name}</td>
                            <td>{Object.keys(Interviewees).length?Interviewees[interview.user_id].name:"Loading"}</td>
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

export default ListInterviews;
