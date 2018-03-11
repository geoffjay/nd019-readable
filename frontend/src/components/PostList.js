import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import PostCard from './PostCard'
import PostDialog from './PostDialog'

const styles = theme => ({
  button: {
    position: 'fixed',
    right: 25,
    bottom: 25,
    margin: theme.spacing.unit,
  },
})

class PostList extends Component {

  state = {
    postDialogOpen: false,
  }

  openPostDialog = () => {
    this.setState(() => ({
      postDialogOpen: true,
    }))
  }

  closePostDialog = () => {
    this.setState(() => ({
      postDialogOpen: false,
    }))
  }

  onSubmitPost = () => {
    console.log('hi')
    this.closePostDialog()
  }

  render() {
    const { postDialogOpen } = this.state
    const { classes } = this.props

    const posts = [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
      },
      {
        id: '1z2daa5ym7nfpo332neq',
        timestamp: 1468479763123,
        title: 'Do stuff',
        body: 'Suck it trebek.',
        author: 'fergturd',
        category: 'udacity',
        voteScore: 1,
        deleted: false,
        commentCount: 0
      }
    ]

    return (
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.button}
          onClick={this.openPostDialog}
        >
          <AddIcon />
        </Button>
        <PostDialog
          open={postDialogOpen}
          onCancel={this.closePostDialog}
          onSubmit={this.onSubmitPost}
        />
      </div>
    )
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)
