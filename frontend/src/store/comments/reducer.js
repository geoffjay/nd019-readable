import * as types from './actionTypes'

const comments = (state = [], action) => {
  const { post, comment } = action

  switch (action.type) {
  case types.CREATE_COMMENT:
    return {
      ...state,
      [comment.id]: comment,
      // XXX: Could this be done as a single assignment?
      [comment.id]: {
        ...state[comment.id],
        parentId: post.id
      },
      [post.id]: {
        ...state[post.id],
        commentCount: post.commentCount + 1
      }
    }
  case types.UPDATE_COMMENT:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        timestamp: comment.timestamp,
        body: comment.body
      }
    }
  case types.DELETE_COMMENT:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        deleted: true
      }
    }
  case types.UPVOTE_COMMENT:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        voteScore: comment.voteScore + 1
      }
    }
  case types.DOWNVOTE_COMMENT:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        voteScore: comment.voteScore - 1
      }
    }
  default:
    return state
  }
}

export default comments
