import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import categories from './categories/reducer'
import comments from './comments/reducer'
import posts from './posts/reducer'

export default combineReducers({
  form: reduxFormReducer,
  categories,
  comments,
  posts,
})
