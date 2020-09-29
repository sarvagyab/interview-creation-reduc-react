import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: false,
    hasErrors: false,
    interviewFull: {},
}

const interviewFullSlice = createSlice({
    name: 'interviewFull',
    initialState,
    reducers: {
        getInterviewFull: (state) => {
            state.loading = true
        },
        getInterviewFullSuccess: (state, { payload }) => {
            state.interviewFull[payload.interview.id] = payload
            state.loading = false
            state.hasErrors = false
        },
        getInterviewFullFailure: (state) => {
            state.loading = false
            state.hasErrors = true
        },
    },
})


// Three actions generated from the slice
export const {getInterviewFull, getInterviewFullSuccess, getInterviewFullFailure} = interviewFullSlice.actions

// A selector
export const interviewFullSelector = (state) => state.interviewFull

// The reducer
export default interviewFullSlice.reducer


export function fetchInterviewFull(id) {
    return async (dispatch) => {
        dispatch(getInterviewFull())

        try {
            const response = await fetch(`http://localhost:3000/interviews/${id}.json/`);
            const data = await response.json()
            dispatch(getInterviewFullSuccess(data))
        } catch (error) {
            dispatch(getInterviewFullFailure())
        }
    }
}