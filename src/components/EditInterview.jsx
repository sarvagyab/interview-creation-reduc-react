import React from 'react';
import {useParams} from 'react-router-dom';
import InterviewForm from './common/InterviewForm';
import { useDispatch } from 'react-redux';
import { updateInterview } from '../slices/interviews';


const EditInterview = (props) => {

    let {id} = useParams();
    const dispatch = useDispatch();

    const sendData = (formData)=>{
        dispatch(updateInterview(formData,id));
    }


    return(
        <InterviewForm heading="Edit Interview" buttonText="Edit" sendData={sendData} />
    );
}
 
export default EditInterview;