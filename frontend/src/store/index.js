import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialStore = {
  categories: {},
  posts: {
    postsById: undefined,
    isFetched: false
  },
  comments: {},
}

const store = createStore(
  reducer,
  initialStore,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store
