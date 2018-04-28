import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reset } from 'redux-form'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Card, {
  CardHeader,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'

import AddIcon from 'material-ui-icons/Add'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

import PostDialog from '../components/PostDialog'
import PostNavbar from '../components/PostNavbar'
import CommentDialog from '../components/CommentDialog'
import CommentList from '../components/CommentList'
import * as api from '../utils/api'
import store from '../store'
import {
  fetchPosts,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
} from '../store/posts/actions'
import {
  fetchCommentsByPost,
  createComment,
  updateComment,
} from '../store/comments/actions'

const styles = theme => ({
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    position: 'fixed',
    right: 25,
    bottom: 25,
    margin: theme.spacing.unit,
  },
  card: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 3,
    width: 'auto',
  }),
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
})

const propTypes = {
  classes: PropTypes.object.isRequired,
}

class Post extends Component {

  state = {
    post: undefined,
    expanded: true,
    postDialogOpen: false,
    commentDialogOpen: false,
  }

  /**
   * @description Fetch a post from the list using route params.
   */
  componentDidMount() {
    const { history, match, posts, loadPosts } = this.props

    // This is a lame way to do this, but it works sooo.....
    api.getPost(match.params.id).then((response) => {
      if (Object.keys(response).length === 0) {
        history.push('/error')
      }
    })

    new Promise(resolve => {
      loadPosts()
    })

    if (posts) {
      this.setState({
        post: posts[match.params.id]
      })
      this.props.loadComments(match.params.id)
    }
  }

  componentWillMount() {
  }

  /**
   * @description Expand or close the comments section of the post.
   */
  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  /**
   * @description Reduce the vote score of the post.
   */
  handleDownvotePost = () => {
    const { downvotePost } = this.props
    const { post } = this.state
    const score = post.voteScore - 1
    this.setState({
      post: {
        ...post,
        voteScore: score
      }
    })
    downvotePost({ post: post })
  }

  /**
   * @description Increase the vote score of the post.
   */
  handleUpvotePost = () => {
    const { upvotePost } = this.props
    const { post } = this.state
    const score = post.voteScore + 1
    this.setState({
      post: {
        ...post,
        voteScore: score
      }
    })
    upvotePost({ post: post })
  }

  /**
   * @description Set the post state to deleted with the API server.
   */
  handleDelete = () => {
    const { history, deletePost } = this.props
    const { post } = this.state
    deletePost({ post: post })
    history.go(-1)
  }

  /**
   * @description Open the dialog modal to update the post.
   */
  openPostDialog = () => {
    this.setState({
      postDialogOpen: true,
    })
  }

  /**
   * @description Close the dialog modal after the post submission.
   */
  closePostDialog = () => {
    this.setState({
      postDialogOpen: false,
    })
  }

  /**
   * @description Update the post by submitting to the API.
   * @param {object} post - The post to submit to the server
   */
  submitPost = values => {
    const { updatePost } = this.props
    const { post } = this.state
    const newPost = {
      ...post,
      title: values.title,
      body: values.body,
    }

    this.setState({ post: newPost })
    updatePost({ post: newPost })
    // XXX: See comment in Home/submitPost
    store.dispatch(reset('post'))
    this.closePostDialog()
  }

  /**
   * @description Open the dialog modal to create a new comment.
   */
  openCommentDialog = () => {
    this.setState({
      commentDialogOpen: true,
    })
  }

  /**
   * @description Close the dialog modal after the comment submission.
   */
  closeCommentDialog = () => {
    this.setState({
      commentDialogOpen: false,
    })
  }

  /**
   * @description Create a new comment by submitting to the API.
   * @param {object} comment - The comment to submit to the server
   */
  submitComment = values => {
    const { post } = this.state
    const comment = {
      author: values.author,
      body: values.body,
      parentId: this.state.post.id,
    }

    this.props.createComment(comment)
    // XXX: See comment in Home/submitPost
    store.dispatch(reset('comment'))
    this.closeCommentDialog()

    this.setState({
      post: {
        ...post,
        commentCount: post.commentCount + 1
      }
    })
  }

  /**
   * @description I'm fully aware that this is the wrong way to do this, but
   * it works, and the way that the routing needs to be done for this project
   * causes this to be much more confusing than if it was just /posts/{postId}.
   */
  update = () => {
    const { match, posts, loadPosts } = this.props
    new Promise(resolve => {
      loadPosts()
    })

    if (posts) {
      this.setState({
        post: posts[match.params.id]
      })
      this.props.loadComments(match.params.id)
    }
  }

  render() {
    const { classes, categories } = this.props
    const { post } = this.state

    let subheader = 'undefined'
    if (post) {
      const dateTime = new Date(post.timestamp)
      const date = dateTime.toDateString()
      const time = dateTime.toTimeString()
      subheader = `${date} ${time}`
    } else {
      this.update()
    }

    return (
      <div>
        <PostNavbar />
        {post &&
          <div>
            <Card className={classes.card} elevation={4}>
              <CardHeader
                avatar={
                  <Avatar aria-label="User" className={classes.avatar}>
                    {post.author[0] && post.author[0].toUpperCase()}
                  </Avatar>
                }
                title={post.title}
                subheader={subheader}
              />
              <CardContent>
                <Typography component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton
                  aria-label="Vote down"
                  onClick={this.handleDownvotePost}
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <Typography component="p">
                  {post.voteScore}
                </Typography>
                <IconButton
                  aria-label="Vote up"
                  onClick={this.handleUpvotePost}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                  onClick={this.handleExpandClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  onClick={this.openPostDialog}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  onClick={this.handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph variant="body2">
                    {post.commentCount} Comments
                  </Typography>
                  <CommentList />
                </CardContent>
              </Collapse>
            </Card>
            <Button
              variant="fab"
              color="secondary"
              className={classes.button}
              onClick={this.openCommentDialog}
            >
              <AddIcon />
            </Button>
            <PostDialog
              open={this.state.postDialogOpen}
              categories={categories}
              postData={post}
              onCancel={this.closePostDialog}
              onSubmit={this.submitPost}
            />
            <CommentDialog
              open={this.state.commentDialogOpen}
              onCancel={this.closeCommentDialog}
              onSubmit={this.submitComment}
            />
          </div>
        }
      </div>
    )
  }
}

Post.propTypes = propTypes

const mapStateToProps = state => ({
  posts: state.posts.postsById,
  comments: state.comments.commentsByPost,
  categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(fetchPosts()),
  updatePost: (post) => dispatch(updatePost(post)),
  deletePost: (post) => dispatch(deletePost(post)),
  upvotePost: (post) => dispatch(upvotePost(post)),
  downvotePost: (post) => dispatch(downvotePost(post)),
  loadComments: (postId) => dispatch(fetchCommentsByPost(postId)),
  createComment: (comment) => dispatch(createComment(comment)),
  updateComment: (comment) => dispatch(updateComment(comment)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post)))
