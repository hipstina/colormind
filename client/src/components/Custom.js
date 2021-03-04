import React, { Component } from 'react'

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

    const newCombo = {
      contrast_ratio: '3',
      w3_grade: 'AA',
      color1: this.state.color1,
      color2: this.state.color2
    }

    console.log('HANDLING SUBMIT', event)

    this.props.setCombo(newCombo)
  }

  // move addCombo to App
  // setup another get request to refresh data

  render() {
    // console.log('Custom props!', this.props)
    return (
      <div>
        <h1>Custom</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="#66ee4f"
            name="color1"
            value={this.state.color1}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="#fb396b"
            name="color2"
            value={this.state.color2}
            onChange={this.handleChange}
          />
          <button onClick={this.props.handleClick}>Preview</button>
          {[...Object.keys(this.props.selectedCombo)].length > 0 && (
            <button type="submit" className="custom-btn">
              Save to Collection
            </button>
          )}
        </form>
      </div>
    )
  }
}
