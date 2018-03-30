import * as types from './actionTypes'

const posts = (state = [], action) => {
  const { post } = action

  switch (action.type) {
  case types.CREATE_POST:
    return {
      ...state,
      [post.id]: post
    }
  case types.UPDATE_POST:
    return {
      ...state,
      [post.id]: {
        ...state[post.id],
        title: post.title,
        body: post.body
      }
    }
  case types.DELETE_POST:
    return {
      ...state,
      [post.id]: {
        ...state[post.id],
        deleted: true
      }
      // for (comment of(?) state.comments) { comment.parentDeleted = true }
    }
  case types.UPVOTE_POST:
    return {
      ...state,
      [post.id]: {
        ...state[post.id],
        voteScore: post.voteScore + 1
      }
    }
  case types.DOWNVOTE_POST:
    return {
      ...state,
      [post.id]: {
        ...state[post.id],
        voteScore: post.voteScore - 1
      }
    }
  default:
    return state
  }
}

export default posts
