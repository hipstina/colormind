import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './screens/Home'
import Collections from './screens/Collections'
import Custom from './components/Custom'
import Collection from './components/Collection'

import contrast from 'get-contrast'
// import randomcolor from 'randomcolor'
import axios from 'axios'
import { BASE_URL } from './globals'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      selectedCombo: {
        color1: '#ffffff',
        color2: '#444444'
        // color1: '',
        // color2: ''
      },
      contrast: {
        // ratio: contrast.ratio('#ffffff', '#444444').toFixed(2),
        // score: contrast.score('#ffffff', '#444444')
        ratio: '',
        score: ''
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

  addCombo = async () => {
    try {
      const selectedCombo = this.state.selectedCombo
      const contrast = this.state.contrast
      const newCombo = {
        contrast_ratio: contrast.ratio1,
        w3_grade: contrast.score,
        color1: selectedCombo.color1,
        color2: selectedCombo.color2
      }

      const res = await axios.post(`${BASE_URL}/api/create`, newCombo)
      // console.log('addcombo', res)

      return res
    } catch (error) {
      console.log(error)
    }
  }

  updateCollection = async (collection) => {
    // console.log('udpateCOllection', collection, collection.id)
    // console.log(
    //   'update coll path:',
    //   `${BASE_URL}/api/edit/collection/${collection.id}`
    // )
    try {
      const comboId = await this.addCombo()
      console.log(comboId)
      const arg = {
        alias: collection.alias,
        combos: comboId.data.newCombo._id
      }
      console.log('arg', arg)
      console.log('collection.id', collection.id)
      const res = await axios.put(
        `${BASE_URL}/api/edit/collection/${collection.id}`,
        arg
      )
      console.log(res)
      this.getCollections()
    } catch (error) {
      console.log(error)
    }
  }

  createCollection = async (alias) => {
    // console.log('CLICKED')
    // console.log('createCollection arg', alias.alias)
    // find collection by alias. If existing, append selectedCombo and return message that collection by that name exists.
    // Else create new collection with selectedCombo
    // return collection name

    try {
      const combo = await this.addCombo()
      console.log(combo)
      const res = await axios.post(`${BASE_URL}/api/add/collection`, {
        alias: alias.alias,
        combos: combo.data.newCombo._id
      })

      this.getCollections()
      return res
    } catch (error) {
      console.log(error)
    }
  }

  setCombo = (combo) => {
    // console.log('setting combo', combo)
    this.setState({
      selectedCombo: combo
    })
    this.calcContrast(combo)
  }

  calcContrast = (combo) => {
    // console.log('calculating contrast', combo)
    const color1 = combo.color1
    const color2 = combo.color2
    // if contrast ratio of selectedCombo is too low, set selectedCombo.color1 to default color (white or black) to preserve app's legibility
    // return contrast_ratio

    // console.log('calculating contrast', color1, color2)

    let ratio = ''
    let score = ''
    // let isAccessible = ''
    // console.log('calcContrast', color1, color2)

    ratio = contrast.ratio(`${color1}`, `${color2}`).toFixed(2)
    score = contrast.score(`${color1}`, `${color2}`)
    // isAccessible = contrast.isAccessible(`${color1}`, `${color2}`)

    this.setState(() => ({
      contrast: { ratio: ratio, score: score }
    }))

    // console.log('calcContrast', color1, color2, ratio, score, isAccessible)
  }

  calcRandomCombo = () => {
    // onload, generate a random color combo to initialize state
    // invoke calcContrast to make sure the initialize state is good contrast level
  }
  deleteCollection = async (id) => {
    console.log(`deleting collection + ${id}`)
    try {
      await axios.delete(`${BASE_URL}/api/delete/collection/${id}`)
      console.log(`deleted collection + ${id}`)
      // const res2 = await axios.get(`${BASE_URL}/api/get/collections`)
      // this.setState({
      //   data: res2.data
      // })
      // console.log(`STATE DATA UPDATED after DELETE`)
      // return res2.data
    } catch (error) {
      throw error
    }
    this.getCollections()
  }

  render() {
    const data = this.state.data

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
                  calcContrast={this.calcContrast}
                  contrast={this.state.contrast}
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
                  getCollections={this.getCollections}

                  // setCombo={this.setCombo}
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
          </Switch>
        </main>
      </div>
    )
  }
}
