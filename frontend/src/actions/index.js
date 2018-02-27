export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export function createPost ({ post }) {
  return {
    type: CREATE_POST,
    post,
  }
}

export function updatePost ({ post }) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export function deletePost ({ post }) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function createComment ({ post, comment }) {
  return {
    type: CREATE_COMMENT,
    post,
    comment,
  }
}
