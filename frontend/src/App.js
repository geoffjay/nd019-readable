import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import deepOrange from 'material-ui/colors/deepOrange'
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
            <Route exact path="/:category?" component={Home} />
            <Route exact path="/:category/:id" component={Post} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App)
