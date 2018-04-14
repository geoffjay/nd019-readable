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

/* GET /categories
 *
 * TODO: Add documentation
 */
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

/* GET /:category/posts
 *
 * TODO: Add documentation
 */
export const getPostsByCategory = (categoryId) =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())

/* GET /posts
 *
 * TODO: Add documentation
 */
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

/* POST /posts
 *
 * TODO: Add documentation
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

/* GET /posts/:id
 *
 * TODO: Add documentation
 */
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())

/* POST /posts/:id
 *
 * TODO: Add documentation
 */
export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(option)
  }).then(res => res.json())

/* PUT /posts/:id
 *
 * TODO: Add documentation
 */

/* DELETE /posts/:id
 *
 * TODO: Add documentation
 */
export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

/* GET /posts/:id/comments
 *
 * TODO: Add documentation
 */
export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

/* POST /comments
 *
 * TODO: Add documentation
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

/* GET /comments/:id
 *
 * TODO: Add documentation
 */
export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

/* POST /comments/:id
 *
 * TODO: Add documentation
 */
export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(option)
  }).then(res => res.json())

/* PUT /comments/:id
 *
 * TODO: Add documentation
 */

/* DELETE /comments/:id
 *
 * TODO: Add documentation
 */
export const removeComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
