import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
//import * as asyncInitialState from 'redux-async-initial-state'
import reducer from './reducers'
//import * as api from '../utils/api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/*
 *const loadStore = (currentState) => {
 *  return new Promise(resolve => {
 *    api.getCategories().then(data => {
 *      resolve({
 *        ...currentState,
 *        categories: data,
 *      })
 *    })
 *  })
 *}
 */

const initialStore = {
  categories: {},
  posts: {
    postsById: undefined,
    isFetched: false
  },
  comments: {
    selectedCommentId: undefined,
  },
}

const store = createStore(
  reducer,
  initialStore,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

/*
 *const store = createStore(
 *  reducer,
 *  initialStore,
 *  composeEnhancers(
 *    applyMiddleware(thunk, asyncInitialState.middleware(loadStore))
 *  )
 *)
 */

export default store
