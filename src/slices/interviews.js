import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: false,
    hasErrors: false,
    interviews: [],
}

const interviewsSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {
        getInterviews: (state) => {
            state.loading = true
        },
        getInterviewsSuccess: (state, { payload }) => {
            state.interviews = payload
            state.loading = false
            state.hasErrors = false
        },
        getInterviewsFailure: (state) => {
            state.loading = false
            state.hasErrors = true
        },
        deleteInterviews: (state) => {
            state.loading = true;
        },
        deleteInterviewsSuccess: (state,{payload}) =>{
            state.loading = false;
            console.log(payload);
            let index = undefined;
            state.interviews.forEach((interview,indexofin)=>{
                console.log('interviewid - ',interview.id);
                console.log('payloadid - ',payload.id);
                if(interview.id === payload.id)index= indexofin;
            });
            state.interviews.splice(index,1);
        },
        deleteInterviewsFail: (state) =>{
            state.loading = false;
            state.hasErrors = true;
        },
        postInterviews: (state) => {
            state.loading = true;
        },
        postInterviewsSuccess: (state,{payload}) =>{
            console.log(payload);
            state.loading = false;
            // const index = state.interviews.indexOf(interview=>interview.id === payload.removeID);
            // state.interviews.splice(index,1);
        },
        postInterviewsFail: (state) =>{
            state.loading = false;
            state.hasErrors = true;
        },
        updateInterviews: (state) => {
            state.loading = true;
        },
        updateInterviewsSuccess: (state,{payload}) =>{
            console.log(payload);
            state.loading = false;
        },
        updateInterviewsFail: (state) =>{
            state.loading = false;
            state.hasErrors = true;
        }
    },
})


// Three actions generated from the slice
export const {getInterviews, getInterviewsSuccess, getInterviewsFailure, deleteInterviews, deleteInterviewsSuccess, deleteInterviewsFail, postInterviews, postInterviewsSuccess, postInterviewsFail, updateInterviews, updateInterviewsSuccess, updateInterviewsFail} = interviewsSlice.actions

// A selector
export const interviewsSelector = (state) => state.interviews

// The reducer
export default interviewsSlice.reducer


export function fetchInterviews() {
    return async (dispatch) => {
        dispatch(getInterviews())

        try {
            const response = await fetch('http://localhost:3000/interviews.json/');
            const data = await response.json()
            dispatch(getInterviewsSuccess(data))
        } catch (error) {
            dispatch(getInterviewsFailure())
        }
    }
}

export function deleteInterview(id){
    return async(dispatch) => {
        dispatch(deleteInterviews());
        try{
            const response = await fetch(`http://localhost:3000/interviews/${id}.json`,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' 
                },
            });
            const data = await response.json();
            dispatch(deleteInterviewsSuccess({id,...data}));
        }catch(error){
            console.log(error);
            dispatch(deleteInterviewsFail());
        }
    }
}


export function postInterview(formData){
    return async(dispatch) => {
        dispatch(postInterviews());
        try{
            const response = await fetch(`http://localhost:3000/interviews.json`,{
                method: 'POST',
                body:formData
            });
            const data = await response.json();
            console.log('response - ',data);
            dispatch(postInterviewsSuccess(data));
        }catch(error){
            console.log(error);
            dispatch(postInterviewsFail());
        }
    }
}

export function updateInterview(formData,id){
    return async(dispatch) => {
        dispatch(updateInterviews());
        try{
            const response = await fetch(`http://localhost:3000/interviews/${id}.json`,{
                method: 'PATCH',
                body:formData
            });
            const data = await response.json();
            console.log('response - ',data);
            dispatch(updateInterviewsSuccess(data));
        }catch(error){
            console.log(error);
            dispatch(updateInterviewsFail());
        }
    }
}