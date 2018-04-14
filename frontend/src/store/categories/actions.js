//import _ from 'lodash'
import { getCategories } from '../../utils/api'
import * as types from './types'

export function fetchCategories() {
  return dispatch => {
    getCategories()
      .then((categories) => {
        //const categoriesByName = _.keyBy(categories, (c) => c.name)
        dispatch({ type: types.CATEGORIES_FETCHED, categories })
      })
  }
}
