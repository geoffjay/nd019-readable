import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { fetchPosts, fetchPostsByCategory } from '../store/posts/actions'

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
        {list && list.map(function(post) {
          return <PostCard key={post.id} post={post} />
        })}
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
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))
