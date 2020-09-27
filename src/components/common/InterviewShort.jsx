import React from 'react';
import Parser from '../../utilities/parser'
import Actions from './Actions'

const InterviewShort = (props) => {
    const {interview,Interviewees} =  props;
    return ( 
    <tr>
        <td>{interview.name}</td>
        <td>{Interviewees[interview.user_id].name}</td>
        <td>{Parser.parseDate(interview.start_time)}</td>
        <td>{Parser.parseTime(interview.start_time)} - {Parser.parseTime(interview.end_time)}</td>
        <td><Actions id={interview.id} path="interviews" /></td>
    </tr> 
    );
}
 
export default InterviewShort;