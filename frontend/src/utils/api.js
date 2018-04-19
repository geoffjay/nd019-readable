import uuidv1 from 'uuid/v1'

const host = process.env.READABLE_HOST || 'localhost'
const port = process.env.READABLE_PORT || 3001

// Generate a unique token for the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const api = `http://${host}:${port}`

/**
 * @description Retrieve all categories.
 *
 * GET /categories
 */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/**
 * @description Retrieve all posts for a category.
 * @param {string} categoryId - ID of the category to retrieve all posts for
 *
 * GET /:category/posts
 */
export const getPostsByCategory = (categoryId) =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())

/**
 * @description Retrieve all posts.
 *
 * GET /posts
 */
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

/**
 * @description Create a new post.
 * @param {object} post - Data to create a new post from
 *
 * POST /posts
 */
export const addPost = (post) => {
  post.id = uuidv1()
  post.timestamp = Date.now()
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(post)
  }).then(res => res.json())
}

/**
 * @description Retrieve a single post.
 * @param {string} id - UUID of the post to retrieve
 *
 * GET /posts/:id
 */
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())

/**
 * @description Change the vote score of a post.
 * @param {string} id - UUID of the post to change
 * @param {string} option - `upvote' or `downvote'
 *
 * POST /posts/:id
 */
export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(option)
  }).then(res => res.json())

/**
 * @description Update the post content.
 * @param {object} post - Data to update the post with
 *
 * PUT /posts/:id
 */
export const updatePost = (post) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(post)
  }).then(res => res.json())
}

/**
 * @description Delete a post.
 * @param {string} id - UUID of the post to delete
 *
 * DELETE /posts/:id
 */
export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

/**
 * @description Retrieve all comments for a post.
 * @param {string} postId - UUID of the post to retrieve comments for
 *
 * GET /posts/:id/comments
 */
export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

/**
 * @description Create a new comment
 * @param {object} comment - Data to use to create a new comment
 *
 * POST /comments
 */
export const addComment = (comment) => {
  comment.id = uuidv1()
  comment.timestamp = Date.now()
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(res => res.json())
}

/**
 * @description Retrieve a comment
 * @param {string} id - UUID of the comment to retrieve
 *
 * GET /comments/:id
 */
export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

/**
 * @description Change the vote score of a comment.
 * @param {string} id - UUID of the comment to change
 * @param {string} option - `upvote' or `downvote'
 *
 * POST /comments/:id
 */
export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(option)
  }).then(res => res.json())

/**
 * @description Update the comment content.
 * @param {object} comment - Data to update the comment with
 *
 * PUT /comments/:id
 */
export const updateComment = (comment) => {
  console.log(comment)
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(comment)
  }).then(res => res.json())
}

/**
 * @description Delete a comment.
 * @param {string} id - UUID of the comment to delete
 *
 * DELETE /comments/:id
 */
export const removeComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
