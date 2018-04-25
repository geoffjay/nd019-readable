import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
//import * as asyncInitialState from 'redux-async-initial-state'
import categories from './categories/reducer'
import comments from './comments/reducer'
import posts from './posts/reducer'

const reducer = /*asyncInitialState.outerReducer(*/combineReducers({
  form: reduxFormReducer,
  categories,
  comments,
  posts,
  //asyncInitialState: asyncInitialState.innerReducer,
})/*)*/

export default reducer
