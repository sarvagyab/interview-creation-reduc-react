import {combineReducers} from 'redux'
import interviewsReducer from './interviewsReducer'

const rootReducer = combineReducers({
  interviews: interviewsReducer,
});

export default rootReducer