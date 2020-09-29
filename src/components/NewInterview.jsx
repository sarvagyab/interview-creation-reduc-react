import React from 'react';
import InterviewForm from './common/InterviewForm';

import {useDispatch} from 'react-redux';
import { postInterview } from '../slices/interviews';

const NewInterview = (props) => {

    const dispatch = useDispatch();

    const sendData = (formData)=>{
        dispatch(postInterview(formData));
    }

    return(
        <InterviewForm heading="Create New Interview" buttonText="Create" sendData={sendData} />
    );
}
 
export default NewInterview;