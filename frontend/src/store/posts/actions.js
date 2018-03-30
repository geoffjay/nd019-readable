import * as types from './actionTypes'

export function createPost ({ post }) {
  return {
    type: types.CREATE_POST,
    post,
  }
}

export function updatePost ({ post }) {
  return {
    type: types.UPDATE_POST,
    post,
  }
}

export function deletePost ({ post }) {
  return {
    type: types.DELETE_POST,
    post,
  }
}

export function upvotePost ({ post }) {
  return {
    type: types.UPVOTE_POST,
    post,
  }
}

export function downvotePost ({ post }) {
  return {
    type: types.DOWNVOTE_POST,
    post,
  }
}
