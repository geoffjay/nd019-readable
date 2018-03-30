import * as types from './actionTypes'

export function createComment ({ post, comment }) {
  return {
    type: types.CREATE_COMMENT,
    post,
    comment,
  }
}

export function updateComment ({ comment }) {
  return {
    type: types.UPDATE_COMMENT,
    comment,
  }
}

export function deleteComment ({ comment }) {
  return {
    type: types.DELETE_COMMENT,
    comment,
  }
}

export function upvoteComment ({ comment }) {
  return {
    type: types.UPVOTE_COMMENT,
    comment,
  }
}

export function downvoteComment ({ comment }) {
  return {
    type: types.DOWNVOTE_COMMENT,
    comment,
  }
}
