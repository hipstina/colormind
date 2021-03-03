import React, { Component } from 'react'
import Combo from './Combo'
import '../styles/components/Collection.css'

import axios from 'axios'
import { BASE_URL } from '../globals'

export default class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      combos: []
    }
  }

  componentDidMount() {
    this.getAllCombos()
  }

  getAllCombos = () => {
    this.state.data.forEach(async (id) => {
      try {
        let combo = await axios.get(`${BASE_URL}/api/find/${id}`)

        this.setState((prevState) => ({
          combos: [combo, ...prevState.combos]
        }))
      } catch (error) {
        console.log(error)
      }
    })
  }

  render() {
    const combos = this.state.combos

    return (
      <div>
        <h1>Collection</h1>
        <div className="color-combo-wrapper">
          {combos.map((combo) => {
            console.log('combo rendered!', combo.data)
            return <Combo key={combo._id} data={combo.data} />
          })}
        </div>
      </div>
    )
  }
}
