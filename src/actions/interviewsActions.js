export const GET_INTERVIEWS = 'GET_INTERVIEWS'
export const GET_INTERVIEWS_SUCCESS = 'GET_INTERVIEWS_SUCCESS'
export const GET_INTERVIEWS_FAILURE = 'GET_INTERVIEWS_FAILURE'


export const getInterviews = () => ({
    type: GET_INTERVIEWS,
})

export const getInterviewsSuccess = (interviews) => ({
    type: GET_INTERVIEWS_SUCCESS,
    payload: interviews,
})

export const getInterviewsFailure = () => ({
    type: GET_INTERVIEWS_FAILURE,
});



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
