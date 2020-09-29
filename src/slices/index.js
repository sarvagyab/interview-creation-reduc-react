import { combineReducers } from 'redux'
import interviewsReducer from './interviews'
import usersReducer from './users'
import interviewFullReducer from './interviewFull'

const rootReducer = combineReducers({
    interviews: interviewsReducer,
    users: usersReducer,
    interviewFull: interviewFullReducer
})

export default rootReducer