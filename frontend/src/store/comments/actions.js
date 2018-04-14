import _ from 'lodash'
import * as api from '../../utils/api'
import * as types from './types'

export function fetchCommentsByPost(post) {
  return dispatch => {
    api.getPostComments(post)
      .then((comments) => {
        const commentsByPost =
          _.keyBy(_.flatten(comments), (comment) => comment.parentId)
        dispatch({ type: types.COMMENTS_FETCHED_BY_POST, commentsByPost })
      }).catch(error => {
        throw(error)
      })
  }
}

export function createComment({ post, comment }) {
  return {
    type: types.COMMENTS_CREATE,
    post,
    comment,
  }
}

export function updateComment({ comment }) {
  return {
    type: types.COMMENTS_UPDATE,
    comment,
  }
}

export function deleteComment({ comment }) {
  return {
    type: types.COMMENTS_DELETE,
    comment,
  }
}

export function upvoteComment({ comment }) {
  return dispatch => {
    api.voteComment(comment.id, { option: 'upVote' })
      .then((comment) => {
        dispatch({ type: types.COMMENTS_UPVOTE, comment })
      }).catch(error => {
        throw(error)
      })
  }
}

export function downvoteComment ({ comment }) {
  return dispatch => {
    api.voteComment(comment.id, { option: 'downVote' })
      .then((comment) => {
        dispatch({ type: types.COMMENTS_DOWNVOTE, comment })
      }).catch(error => {
        throw(error)
      })
  }
}
