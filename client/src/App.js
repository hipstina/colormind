import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './screens/Home'
import About from './screens/About'
import Collections from './screens/Collections'
import Custom from './components/Custom'
import Collection from './components/Collection'

import axios from 'axios'
import { BASE_URL } from './globals'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      selectedCombo: {
        color1: '#B8D4E3',
        color2: '#F26419'
      },
      publishBtn: false
    }
  }

  componentDidMount() {
    this.getCollections()
  }

  getCollections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/get/collections`)
      this.setState({
        data: res.data
      })
      console.log('getCollection res.data:', res.data)
    } catch (error) {
      throw error
    }
  }

  deleteCollection = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/delete/collection/${this.state.collectionId}`
      )
      console.log(res.data)
      const res2 = await axios.get(`${BASE_URL}/api/`)
      this.setState({
        data: res2.data
      })
      return res2.data
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
        `${BASE_URL}/api/view/collection/6040ae59e580a341250c47ab`
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
    // this.addCombo()
    // this.getCollections()
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
    console.log('APP state', this.state.data)
    return (
      <div className="App ">
        <Nav nav={this.state.nav} />

        <main className="app-layout">
          <Switch>
            {/* <Route
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
            /> */}
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/checker"
              component={(routerProps) => (
                <Custom
                  {...routerProps}
                  setCombo={this.setCombo}
                  handleClick={this.handleClick}
                />
              )}
            />

            <Route
              exact
              path="/collections"
              component={(routerProps) => (
                <Collections {...routerProps} data={data} />
              )}
            />
            <Route
              exact
              path="/collection/:id"
              component={(routerProps) => <Collection {...routerProps} />}
            />
            <Route exact path="/about" component={About} />
          </Switch>
        </main>
      </div>
    )
  }
}
