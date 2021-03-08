import React, { Component } from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './screens/Home'
import Collections from './screens/Collections'
import Custom from './components/Custom'
import Collection from './components/Collection'

import contrast from 'get-contrast'
import randomColor from 'randomcolor'
import axios from 'axios'
import { BASE_URL } from './globals'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      selectedCombo: {
        color1: '#ffac81',
        color2: '#444444'
      },
      contrast: {
        ratio: '',
        score: ''
      }
    }
  }

  componentDidMount() {
    this.getCollections()

    let randomColor1 = randomColor({
      luminosity: 'dark'
    })

    let randomColor2 = randomColor({
      luminosity: 'light'
    })
    const contrastRandom = contrast.score(`${randomColor1}`, `${randomColor2}`)
    if (contrastRandom === 'AAA') {
      this.setState({
        selectedCombo: {
          color1: randomColor1,
          color2: randomColor2
        }
      })
    } else
      this.setState({
        selectedCombo: {
          color1: randomColor({
            luminosity: 'light'
          }),
          color2: '#333'
        }
      })
  }

  getCollections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/get/collections`)
      this.setState({
        data: res.data
      })
    } catch (error) {
      throw error
    }
  }

  addCombo = async () => {
    try {
      const selectedCombo = this.state.selectedCombo
      const contrast = this.state.contrast
      const newCombo = {
        contrast_ratio: contrast.ratio,
        w3_grade: contrast.score,
        color1: selectedCombo.color1,
        color2: selectedCombo.color2
      }
      const res = await axios.post(`${BASE_URL}/api/create`, newCombo)

      return res
    } catch (error) {
      console.log(error)
    }
  }

  updateCollection = async (collection) => {
    try {
      const comboId = await this.addCombo()
      const arg = {
        alias: collection.alias,
        combos: comboId.data.newCombo._id
      }

      await axios.put(`${BASE_URL}/api/edit/collection/${collection.id}`, arg)
      await this.getCollections()
    } catch (error) {
      console.log(error)
    }
  }

  createCollection = async (alias) => {
    try {
      const combo = await this.addCombo()
      const res = await axios.post(`${BASE_URL}/api/add/collection`, {
        alias: alias.alias,
        combos: combo.data.newCombo._id
      })

      await this.getCollections()
      return res
    } catch (error) {
      console.log(error)
    }
  }

  setCombo = (combo) => {
    this.setState({
      selectedCombo: combo
    })
    this.calcContrast(combo)
  }

  calcContrast = (combo) => {
    const color1 = combo.color1
    const color2 = combo.color2

    let ratio = ''
    let score = ''

    ratio = contrast.ratio(`${color1}`, `${color2}`).toFixed(2)
    score = contrast.score(`${color1}`, `${color2}`)

    this.setState(() => ({
      contrast: { ratio: ratio, score: score }
    }))
  }

  deleteCollection = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete/collection/${id}`)
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
                  selectedCombo={this.state.selectedCombo}
                />
              )}
            />
            <Route
              exact
              path="/collection/:id"
              component={(routerProps) => (
                <Collection
                  {...routerProps}
                  selectedCombo={this.state.selectedCombo}
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
