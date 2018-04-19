import * as types from './types'

const comments = (state = [], action) => {
  const { comment } = action

  switch (action.type) {
  case types.COMMENTS_FETCHED_BY_POST:
    return {
      ...state,
      commentsByPost: action.commentsByPost
    }
  case types.COMMENTS_CREATE:
    return {
      ...state,
      commentsByPost: {
        ...state.commentsByPost,
        [comment.id]: comment
      }
    }
  case types.COMMENTS_UPDATE:
    return {
      ...state,
      commentsByPost: {
        ...state.commentsByPost,
        [comment.id]: {
          ...state.commentsByPost[comment.id],
          author: comment.author,
          body: comment.body
        }
      }
    }
  case types.COMMENTS_DELETE:
    return {
      ...state,
      commentsByPost: {
        ...state.commentsByPost,
        [comment.id]: {
          ...state.commentsByPost[comment.id],
          deleted: true
        }
      }
    }
  case types.COMMENTS_UPVOTE:
    return {
      ...state,
      commentsByPost: {
        ...state.commentsByPost,
        [comment.id]: {
          ...state.commentsByPost[comment.id],
          voteScore: comment.voteScore
        }
      }
    }
  case types.COMMENTS_DOWNVOTE:
    return {
      ...state,
      commentsByPost: {
        ...state.commentsByPost,
        [comment.id]: {
          ...state.commentsByPost[comment.id],
          voteScore: comment.voteScore
        }
      }
    }
  default:
    return state
  }
}

export default comments
