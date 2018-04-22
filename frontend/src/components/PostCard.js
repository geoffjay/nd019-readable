import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, {
  CardHeader,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import {
  upvotePost,
  downvotePost,
} from '../store/posts/actions'

const styles = theme => ({
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  buttons: {
    marginLeft: 'auto',
  },
  card: {
    width: 'auto',
    margin: theme.spacing.unit * 3,
  },
  comments: {
    marginLeft: 16,
    marginTop: 16,
    fontSize: 10,
    color: theme.palette.secondary.light,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
  },
})

const propTypes = {
  classes: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

class PostCard extends Component {

  /*
   *state = {
   *  postDialogOpen: false,
   *}
   */

  render() {
    const {
      classes,
      post,
      onDelete,
      onEdit,
      upvotePost,
      downvotePost
    } = this.props

    const dateTime = new Date(post.timestamp)
    const date = dateTime.toDateString()
    const time = dateTime.toTimeString()
    // FIXME: Putting this literal in the return messes up my highlighting
    const subheader = `${date} ${time}`
    const path = `/${post.category}/${post.id}`
    const link = <Link className={classes.link} to={path}>{post.title}</Link>

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="User" className={classes.avatar}>
                {post.author[0].toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={link}
            subheader={subheader}
          />
          <CardContent>
            <Typography component="p">
              {post.body}
            </Typography>
            <Typography className={classes.comments} component="p">
              ({post.commentCount} comments)
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Vote down"
              onClick={(post) => downvotePost({ post: this.props.post })}
            >
              <ArrowDownwardIcon />
            </IconButton>
            <Typography component="p">
              {post.voteScore}
            </Typography>
            <IconButton
              aria-label="Vote up"
              onClick={(post) => upvotePost({ post: this.props.post })}
            >
              <ArrowUpwardIcon />
            </IconButton>
            <div className={classes.buttons}>
              <IconButton
                aria-label="Edit"
                onClick={() => onEdit.call(post.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                onClick={() => onDelete.call(post.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}

PostCard.propTypes = propTypes

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({
  upvotePost: (post) => dispatch(upvotePost(post)),
  downvotePost: (post) => dispatch(downvotePost(post)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostCard)))
