import React, { useState, Fragment, useEffect } from 'react';
import GET from '../utilities/GET';
import InterviewForm from './common/InterviewForm';

const NewInterview = (props) => {

    const fetchData = async ({setUsersList,setInterviewee})=>{
        let usersList = await GET('http://localhost:3000/users.json');
        setUsersList(usersList);
        setInterviewee(`${usersList[0].id}`)
    }

    return(
        <InterviewForm heading="Create New Interview" buttonText="Create" fetchData={fetchData} method="POST" path="http://localhost:3000/interviews.json" />
    );
}
 
export default NewInterview;