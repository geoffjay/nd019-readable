import _ from 'lodash'
import * as api from '../../utils/api'
import * as types from './types'

export function fetchPosts() {
  return dispatch => {
    api.getPosts()
      .then((posts) => {
        const postsById = _.keyBy(_.shuffle(_.flatten(posts)), (post) => post.id)
        dispatch({
          type: types.POSTS_FETCHED,
          postsById,
        })
      }).catch(error => {
        throw(error)
      })
  }
}

export function fetchPostsByCategory(category) {
  return dispatch => {
    api.getPostsByCategory(category)
      .then((posts) => {
        const postsById = _.keyBy(_.shuffle(_.flatten(posts)), (post) => post.id)
        dispatch({
          type: types.POSTS_FETCHED_BY_CATEGORY,
          postsById,
        })
      }).catch(error => {
        throw(error)
      })
  }
}

export function createPost(post) {
  return dispatch => {
    api.addPost(post)
      .then((post) => {
        dispatch({ type: types.POSTS_CREATE, post })
      }).catch(error => {
        throw(error)
      })
  }
}

export function updatePost({ post }) {
  return dispatch => {
    api.updatePost(post)
      .then((post) => {
        dispatch({ type: types.POSTS_UPDATE, post })
      }).catch(error => {
        throw(error)
      })
  }
}

export function deletePost({ post }) {
  return dispatch => {
    api.removePost(post.id)
      .then((post) => {
        dispatch({ type: types.POSTS_DELETE, post })
      }).catch(error => {
        throw(error)
      })
  }
}

export function upvotePost({ post }) {
  return dispatch => {
    api.votePost(post.id, { option: 'upVote' })
      .then((post) => {
        dispatch({ type: types.POSTS_UPVOTE, post })
      }).catch(error => {
        throw(error)
      })
  }
}

export function downvotePost({ post }) {
  return dispatch => {
    api.votePost(post.id, { option: 'downVote' })
      .then((post) => {
        dispatch({ type: types.POSTS_DOWNVOTE, post })
      }).catch(error => {
        throw(error)
      })
  }
}
