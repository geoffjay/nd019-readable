import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Card, {
  CardHeader,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { upvotePost, downvotePost } from '../store/posts/actions'

const styles = theme => ({
  card: {
    width: 'auto',
    margin: theme.spacing.unit * 3,
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
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
  },
})

const propTypes = {
  classes: PropTypes.object.isRequired,
}

class PostCard extends Component {

  state = {
    expanded: false
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { classes, post, upvote, downvote } = this.props

    const dateTime = new Date(post.timestamp)
    const date = dateTime.toDateString()
    const time = dateTime.toTimeString()
    // FIXME: Putting this literal in the return messes up my highlighting
    const subheader = `${date} ${time}`
    const path = `/posts/${post.id}`
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
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Vote down"
              onClick={(post) => downvote({ post: this.props.post })}
            >
              <ArrowDownwardIcon />
            </IconButton>
            <Typography component="p">
              {post.voteScore}
            </Typography>
            <IconButton
              aria-label="Vote up"
              onClick={(post) => upvote({ post: this.props.post })}
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
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Comments
              </Typography>
              <Typography paragraph>
                Something something...
              </Typography>
              <Typography paragraph>
                Something something...
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

PostCard.propTypes = propTypes

const mapStateToProps = state => ({
  //post: state.post,
})

const mapDispatchToProps = dispatch => ({
  upvote: (post) => dispatch(upvotePost(post)),
  downvote: (post) => dispatch(downvotePost(post)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostCard)))
