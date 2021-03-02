import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './screens/Home'
import About from './screens/About'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      nav: {
        custom: true,
        collection: false,
        checker: true,
        preview: false
      }
    }
  }

  render() {
    return (
      <div className="App ">
        <Nav nav={this.state.nav} />

        <main className="app-layout">
          <Switch>
            <Route
              exact
              path="/"
              component={(routerProps) => <Home {...routerProps} />}
            />
            <Route exact path="/about" component={About} />
          </Switch>
        </main>
      </div>
    )
  }
}
