import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import {
  deletePost,
  fetchPosts,
  fetchPostsByCategory
} from '../store/posts/actions'

const propTypes = {
  category: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
}

class PostList extends Component {

  state = {
    category: 'all',
  }

  /**
   * @description Fetch the list of posts from the API service.
   */
  componentDidMount() {
    this.props.loadPosts()
  }

  /**
   * @description Fetch the posts from the API service for a given category.
   * @param {object} nextProps - The set of properties to update the component
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.state.category) {
      this.setState({ category: nextProps.category })
      if (nextProps.category === 'all') {
        this.props.loadPosts()
      } else {
        this.props.loadPostsByCategory(nextProps.category)
      }
    }
  }

  /**
   * @description Set the post state to deleted with the API server.
   * @param {string} key - Post ID to delete
   */
  handleDelete = (key) => {
    const { posts, deletePost } = this.props
    deletePost({ post: posts[key] })
  }

  /**
   * @description Update the post using the API server.
   * @param {string} key - Post ID to modify content of
   */
  handleEdit = (key) => {
    /*
     *const { posts } = this.props
     */

    /*
     *this.setState({
     *  selectedComment: comments[key],
     *  commentDialogOpen: true,
     *})
     */
  }

  render() {
    const { posts, sortBy } = this.props

    let list = undefined
    if (posts) {
      list = Object.values(posts)
      list.sort(function(a, b) {
        if (sortBy === 'popularity') {
          return b.voteScore - a.voteScore
        } else if (sortBy === 'date') {
          return b.timestamp - a.timestamp
        } else {
          // XXX: This is unnecessary but suppresses a warning
          return 0
        }
      })
    }

    return (
      <div>
        {list &&
         list.filter((post) => post.deleted === false)
             .map(function(post) {
          return (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => this.handleEdit(post.id)}
              onDelete={() => this.handleDelete(post.id)}
            />
          )
        }, this)}
      </div>
    )
  }
}

PostList.propTypes = propTypes

const mapStateToProps = state => ({
  posts: state.posts.postsById,
})

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(fetchPosts()),
  loadPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
  deletePost: (post) => dispatch(deletePost(post)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))
