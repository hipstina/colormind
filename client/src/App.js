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
        contrast_ratio: 2,
        w3_grade: 'A',
        color1: '#B8D4E3',
        color2: '#F26419'
      }
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

  deleteCollection = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/delete/collection/${id}`)
      console.log(res.data)
      console.log(`COLLECTION DELETED`, res.data)
      const res2 = await axios.get(`${BASE_URL}/api/get/collections`)
      this.setState({
        data: res2.data
      })
      console.log(`STATE DATA UPDATED after DELETE`)
      return res2.data
    } catch (error) {
      throw error
    }
  }

  addCombo = async () => {
    try {
      const newCombo = this.state.selectedCombo
      const res = await axios.post(`${BASE_URL}/api/create`, newCombo)
      console.log('addcombo', res)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  updateCollection = async (id) => {
    console.log('updateCollection arg', id)
    console.log(this.state.selectedCombo)
    const newCombo = await this.state.selectedCombo
    console.log('addCombo>>>', newCombo)

    const comboId = await this.addCombo()
    console.log('comboId', comboId.data.newCombo._id)
    // find collection by id and append selectedCombo
    // return collection name

    // const arg = {
    //   combos: [newCombo]
    // }

    const test = {
      alias: 'Yellow Again',
      combos: [comboId]
    }

    const test2 = {
      contrast_ratio: 1,
      w3_grade: 'AA',
      color1: this.state.color1,
      color2: this.state.color2
    }
    console.log('test', test2)
    try {
      const res = await axios.put(
        `${BASE_URL}/api/edit/collection/${id.id}`,
        test2
      )
      // console.log(`SUCCESSFUL. This combo has been added to a collection:`, res)
      this.getCollections()
      return res
    } catch (error) {
      console.log(error)
    }
  }

  createCollection = async (alias) => {
    console.log('createCollection arg', alias)
    // find collection by alias. If existing, append selectedCombo and return message that collection by that name exists.
    // Else create new collection with selectedCombo
    // return collection name
    const combo = await this.addCombo()

    const newCollection = {
      alias: alias,
      combo: [combo]
    }

    try {
      let res = await axios.post(
        `${BASE_URL}/api/find/collection/${alias}`,
        newCollection
      )

      this.getCollections()
    } catch (error) {
      console.log(error)
    }
  }

  setCombo = (combo) => {
    this.setState(() => ({
      selectedCombo: combo
    }))
  }

  calcContrast = async () => {
    // if contrast ratio of selectedCombo is too low, set selectedCombo.color1 to default color (white or black) to preserve app's legibility
    // return contrast_ratio
    const contrast_ratio = await axios.get(
      `https://webaim.org/resources/contrastchecker/?fcolor=${this.state.selectedCombo.color1}&bcolor=${this.state.selectedCombo.color2}&api`
    )
    console.log(`${contrast_ratio}`)
  }
  calcRandomCombo = () => {
    // onload, generate a random color combo to initialize state
    // invoke calcContrast to make sure the initialize state is good contrast level
  }

  render() {
    const data = this.state.data
    console.log('APP state', this.state.data)
    this.calcContrast()

    return (
      <div
        className="App "
        style={{
          backgroundColor: `${this.state.selectedCombo.color1}`,
          color: `${this.state.selectedCombo.color2}`
        }}
      >
        <Nav nav={this.state.nav} />

        <main className="app-layout">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/checker"
              component={(routerProps) => (
                <Custom
                  {...routerProps}
                  setCombo={this.setCombo}
                  handleClick={this.handleClick}
                  selectedCombo={this.state.selectedCombo}
                  collections={this.state.data}
                  updateCollection={this.updateCollection}
                  createCollection={this.createCollection}
                />
              )}
            />

            <Route
              exact
              path="/collections"
              component={(routerProps) => (
                <Collections
                  {...routerProps}
                  data={data}
                  setCombo={this.setCombo}
                />
              )}
            />
            <Route
              exact
              path="/collection/:id"
              component={(routerProps) => (
                <Collection
                  {...routerProps}
                  setCombo={this.setCombo}
                  deleteCollection={this.deleteCollection}
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
