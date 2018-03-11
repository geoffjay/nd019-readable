import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blueGrey from 'material-ui/colors/blueGrey'
import deepOrange from 'material-ui/colors/deepOrange'
import { getCategories } from '../utils/api'
import Home from './Home'
import Post from './Post'
import NoMatch from './NoMatch'

// XXX: Taken from material.io/color
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
  state = {
    categories: []
  }

  componentDidMount() {
    getCategories()
      .then((categories) => {
        this.setState({ categories: categories })
      })
  }

  /*
   *searchCategory = (e) => {
   *}
   */

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:id" component={Post} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
