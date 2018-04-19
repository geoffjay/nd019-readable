import _ from 'lodash'
import * as api from '../../utils/api'
import * as types from './types'

export function fetchCommentsByPost(post) {
  return dispatch => {
    api.getPostComments(post)
      .then((comments) => {
        const commentsByPost =
          _.keyBy(_.shuffle(_.flatten(comments)), (comment) => comment.id)
        dispatch({ type: types.COMMENTS_FETCHED_BY_POST, commentsByPost })
      }).catch(error => {
        throw(error)
      })
  }
}

export function createComment(comment) {
  return dispatch => {
    api.addComment(comment)
      .then((comment) => {
        dispatch({ type: types.COMMENTS_CREATE, comment })
      }).catch(error => {
        throw(error)
      })
  }
}

export function updateComment({ comment }) {
  return dispatch => {
    api.updateComment(comment)
      .then((comment) => {
        dispatch({ type: types.COMMENTS_UPDATE, comment })
      }).catch(error => {
        throw(error)
      })
  }
}

export function deleteComment({ comment }) {
  return dispatch => {
    api.removeComment(comment.id)
      .then((comment) => {
        dispatch({ type: types.COMMENTS_DELETE, comment })
      }).catch(error => {
        throw(error)
      })
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
