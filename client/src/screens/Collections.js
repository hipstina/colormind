import React, { Component } from 'react'
import Combo from '../components/Combo'
import '../styles/screens/Collections.css'

import axios from 'axios'
import { BASE_URL } from '../globals'

export default class Collections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      combos: []
    }
  }

  render() {
    const cols = this.state.data
    return (
      <div>
        <h1>Collections</h1>
        {cols.map((col) => {
          return <div key={col._id}>Collection</div>
        })}
      </div>
    )
  }
}
