import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Card, {
  CardHeader,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'

import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

import { deletePost, upvotePost, downvotePost } from '../store/posts/actions'

const styles = theme => ({
  nav: {
    flexGrow: 1,
  },
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
  flex: {
    flex: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 12,
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
  }

  componentDidMount() {
    const { match, posts } = this.props
    this.setState({
      post: posts[match.params.id]
    })
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleDownvote = () => {
    const { downvote } = this.props
    const { post } = this.state
    // FIXME: This is a hack to get around the state not being updated
    post.voteScore--
    downvote({ post: post })
  }

  handleUpvote = () => {
    const { upvote } = this.props
    const { post } = this.state
    // FIXME: This is a hack to get around the state not being updated
    post.voteScore++
    upvote({ post: post })
  }

  handleDelete = () => {
    const { deletePost } = this.props
    const { post } = this.state
    deletePost({ post: post })
    //this.props.history.go(-1)
  }

  render() {
    const { classes } = this.props
    const { post } = this.state

    let subheader = 'undefined'
    if (post) {
      const dateTime = new Date(post.timestamp)
      const date = dateTime.toDateString()
      const time = dateTime.toTimeString()
      subheader = `${date} ${time}`
    }

    return (
      <div>
        <div className={classes.nav}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.backButton}
                color="inherit"
                component={Link}
                to="/"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Detail
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          {post &&
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
                  onClick={this.handleDownvote}
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <Typography component="p">
                  {post.voteScore}
                </Typography>
                <IconButton
                  aria-label="Vote up"
                  onClick={this.handleUpvote}
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
                  aria-label="Delete"
                  onClick={this.handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph variant="body2">
                    Comments
                  </Typography>
                  {post.comments &&
                   Object.keys(post.comments).map(function(key) {
                    return (
                      <Typography key={key} paragraph>
                        {post.comments[key]}
                      </Typography>
                    )
                  })}
                </CardContent>
              </Collapse>
            </Card>
          }
        </div>
      </div>
    )
  }
}

Post.propTypes = propTypes

const mapStateToProps = state => ({
  posts: state.posts.postsById,
})

const mapDispatchToProps = dispatch => ({
  deletePost: (post) => dispatch(deletePost(post)),
  upvote: (post) => dispatch(upvotePost(post)),
  downvote: (post) => dispatch(downvotePost(post)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post))
