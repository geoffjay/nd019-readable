import { combineReducers } from 'redux'
import categories from './categories/reducer'
import comments from './comments/reducer'
import posts from './posts/reducer'

export default combineReducers({
  categories,
  comments,
  posts,
})
