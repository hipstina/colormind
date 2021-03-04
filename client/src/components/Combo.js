import React, { Component } from 'react'
import '../styles/components/Combo.css'

export default class Combo extends Component {
  handleDelete = (e) => {
    console.log(e, this.props)
    const id = e.comboId
  }

  render() {
    const { color1, color2, createdAt, handleClick, comboId } = this.props.data

    const date = new Date(createdAt)
    console.log('COMBO', this.props.data.data)
    return (
      <div className="combo-wrapper">
        <p className="combo-alias">a combo {date.toDateString()}</p>
        <div className="combo-colors-wrapper">
          <div
            style={{ backgroundColor: `${color1}` }}
            className="color-combo"
            value={color1}
          ></div>
          <div
            style={{ backgroundColor: `${color2}` }}
            className="color-combo"
            value={color2}
          ></div>
        </div>
        <button onClick={this.handleDelete} comboId={comboId}>
          Delete
        </button>
        <button>Preview</button>
      </div>
    )
  }
}
