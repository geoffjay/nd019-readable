import * as types from './types'

const comments = (state = [], action) => {
  const { post, comment } = action

  switch (action.type) {
  case types.COMMENTS_FETCHED_BY_POST:
    // TODO: Decide how to load comments, this doesn't feel right
    return {
      ...state,
      commentsByPost: action.commentsByPost
    }
  case types.COMMENTS_CREATE:
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
  case types.COMMENTS_UPDATE:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        timestamp: comment.timestamp,
        body: comment.body
      }
    }
  case types.COMMENTS_DELETE:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        deleted: true
      }
    }
  case types.COMMENTS_UPVOTE:
    return {
      ...state,
      [comment.id]: {
        ...state[comment.id],
        voteScore: comment.voteScore + 1
      }
    }
  case types.COMMENTS_DOWNVOTE:
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
