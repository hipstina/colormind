import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './screens/Home'
import About from './screens/About'
import Collection from './components/Collection'

import axios from 'axios'
import { BASE_URL } from './globals'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      selectedCombo: {},
      publishBtn: false
    }
  }

  componentDidMount() {
    this.getCollection()
  }

  getCollection = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/view/collection/60400871eec7ee2244085b0e`
      )
      this.setState({
        data: res.data.collection.combo_id
      })
      console.log('getCollection res.data:', res.data)
    } catch (error) {
      throw error
    }
  }

  addCombo = async () => {
    const newCombo = this.state.selectedCombo

    try {
      let res = await axios.post(`${BASE_URL}/api/add`, newCombo)
      console.log('addCombo:', res)
      const res2 = await axios.get(
        `${BASE_URL}/api/view/collection/60400871eec7ee2244085b0e`
      )
      console.log('getCollection again after addCombo:', res2)
      this.setState({
        data: res2.data.collection.combo_id
      })
      return res2.data
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = ({ target }) => {
    this.addCombo()
    this.getCollection()
    console.log('SOMEONE CLICKED', target)
  }

  setCombo = (combo) => {
    //this.props.selectedCombo.push(newCombo)

    this.setState(() => ({
      selectedCombo: combo
    }))
  }

  render() {
    const data = this.state.data

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
                  setCombo={this.setCombo}
                  handleClick={this.handleClick}
                  data={data}
                  selectedCombo={this.state.selectedCombo}
                  publishBtn={this.state.publishBtn}
                />
              )}
            />
            <Route exact path="/collection" component={Collection} />
            <Route exact path="/about" component={About} />
          </Switch>
        </main>
      </div>
    )
  }
}
