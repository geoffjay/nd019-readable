import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import deepOrange from 'material-ui/colors/deepOrange'
// FIXME: These need to go where they're needed
import {
  createPost,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
} from './store/posts/actions'
import {
  createComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
} from './store/comments/actions'
import Home from './containers/Home'
import Post from './containers/Post'
import NoMatch from './containers/NoMatch'

// Theme colors generated at material.io/color
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[400],
      main: blueGrey[700],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
    secondary: {
      light: deepOrange[400],
      main: deepOrange[700],
      dark: deepOrange[900],
      contrastText: '#fff',
    },
  },
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/posts/:id" component={Post} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

// TODO: All of this belongs in the components that use them

function mapStateToProps ({ posts, comments }) {
  return {
    posts: posts,
    comments: comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (data) => dispatch(createPost(data)),
    updatePost: (data) => dispatch(updatePost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    upvotePost: (data) => dispatch(upvotePost(data)),
    downvotePost: (data) => dispatch(downvotePost(data)),
    createComment: (data) => dispatch(createComment(data)),
    updateComment: (data) => dispatch(updateComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    upvoteComment: (data) => dispatch(upvoteComment(data)),
    downvoteComment: (data) => dispatch(downvoteComment(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
