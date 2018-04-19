import * as types from './types'

const posts = (state = {}, action) => {
  const { post } = action

  switch (action.type) {
  case types.POSTS_FETCHED:
    return {
      ...state,
      postsById: action.postsById,
    }
  case types.POSTS_FETCHED_BY_CATEGORY:
    return {
      ...state,
      postsById: action.postsById,
    }
  case types.POSTS_CREATE:
    return {
      ...state,
      postsById: {
        ...state.postsById,
        [post.id]: post
      }
    }
  case types.POSTS_UPDATE:
    return {
      ...state,
      postsById: {
        ...state.postsById,
        [post.id]: {
          ...state.postsById[post.id],
          title: post.title,
          body: post.body
        }
      }
    }
  case types.POSTS_DELETE:
    return {
      ...state,
      postsById: {
        ...state.postsById,
        [post.id]: {
          ...state.postsById[post.id],
          deleted: true
        }
      }
      // for (comment of(?) state.comments) { comment.parentDeleted = true }
    }
  case types.POSTS_UPVOTE:
    return {
      ...state,
      postsById: {
        ...state.postsById,
        [post.id]: {
          ...state.postsById[post.id],
          voteScore: post.voteScore
        }
      },
    }
  case types.POSTS_DOWNVOTE:
    return {
      ...state,
      postsById: {
        ...state.postsById,
        [post.id]: {
          ...state.postsById[post.id],
          voteScore: post.voteScore
        }
      },
    }
  default:
    return state
  }
}

export default posts
