import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import NoMatch from './NoMatch'

class App extends Component {

  state = {
    categories: []
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default App
