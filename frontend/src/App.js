import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import deepOrange from 'material-ui/colors/deepOrange'
import Home from './containers/Home'
import Post from './containers/Post'
import NoMatch from './containers/NoMatch'
import { fetchCategories } from './store/categories/actions'

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
  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            {/* This is disgusting, but there's no way to do dynamic routes */}
            <Route exact path="/error" component={NoMatch} />
            <Route exact path="/:category?" component={Home} />
            <Route exact path="/:category/:id" component={Post} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(fetchCategories()),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
