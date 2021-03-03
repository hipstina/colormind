import React, { Component } from 'react'

import axios from 'axios'
import { BASE_URL } from '../globals'
export default class Custom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: '',
      color2: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('HANDLING SUBMIT', event)

    this.addCombo()
  }

  addCombo = async () => {
    const newCombo = {
      contrast_ratio: 5,
      w3_grade: 'AA',
      color1: this.state.color1,
      color2: this.state.color2
    }

    try {
      let res = await axios.post(`${BASE_URL}/api/add`, newCombo)

      console.log('testing POST:', res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('Custom props!', this.props)
    return (
      <div>
        <h1>Custom</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="#66ee4f"
            name="color1"
            value={this.props.color1}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="#fb396b"
            name="color2"
            value={this.props.color2}
            onChange={this.handleChange}
          />
          <button>Submit</button>
          {this.props.selectedCombo.length === 2 && (
            <button type="submit" className="custom-btn">
              Save to Collection
            </button>
          )}
        </form>
      </div>
    )
  }
}
