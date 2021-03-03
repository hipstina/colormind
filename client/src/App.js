import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './screens/Home'
import About from './screens/About'

import axios from 'axios'
import { BASE_URL } from './globals'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      selectedCombo: [],
      publishBtn: false
    }
  }

  componentDidMount() {
    this.getCollection()
  }

  getCollection = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/view/collection`)
      this.setState({
        data: res.data.collection[0]
      })
      // console.log(res.data)
    } catch (error) {
      throw error
    }
  }

  render() {
    const data = this.state.data.combo_id

    return (
      <div className="App ">
        <Nav nav={this.state.nav} />

        <main className="app-layout">
          <Switch>
            <Route
              exact
              path="/"
              component={(routerProps) => (
                <Home
                  {...routerProps}
                  handleSubmit={this.handleSubmit}
                  handleClick={this.handleClick}
                  // handleChange={this.handleChange}
                  data={data}
                  selectedCombo={this.state.selectedCombo}
                  publishBtn={this.state.publishBtn}
                  color1={this.state.color1}
                  color2={this.state.color2}
                />
              )}
            />
            <Route exact path="/about" component={About} />
          </Switch>
        </main>
      </div>
    )
  }
}
