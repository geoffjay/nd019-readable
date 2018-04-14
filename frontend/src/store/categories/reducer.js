import * as types from './types'

const categories = (state = {}, action) => {
  switch (action.type) {
  case types.CATEGORIES_FETCHED:
    return {
      ...state,
      data: action.categories
    }
  default:
    return state
  }
}

export default categories
