import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { fetchPosts, fetchPostsByCategory } from '../store/posts/actions'

const propTypes = {
  category: PropTypes.string.isRequired,
}

class PostList extends Component {

  state = {
    category: 'all'
  }

  componentDidMount() {
    this.props.loadPosts()
  }

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
    const { posts } = this.props

    return (
      <div>
        {posts && Object.keys(posts).map(function(key) {
          return <PostCard key={key} post={posts[key]} />
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
