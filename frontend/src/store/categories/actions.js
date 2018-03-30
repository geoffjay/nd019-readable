//import _ from 'lodash'
import { getCategories } from '../../utils/api'
import * as types from './actionTypes'

export function fetchCategories() {
  return dispatch => {
    getCategories()
      .then((categories) => {
        //const categoriesByName = _.keyBy(categories, (c) => c.name)
        console.log(categories)
        dispatch({ type: types.CATEGORIES_FETCHED, categories })
      })
  }
}
