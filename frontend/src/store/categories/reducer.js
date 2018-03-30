import * as types from './actionTypes'

const initialState = {
  categoriesByName: undefined
}

const categories = (state = initialState, action) => {
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
