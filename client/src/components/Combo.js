import React, { Component } from 'react'
import '../styles/components/Combo.css'

export default class Combo extends Component {
  render() {
    const { color1, color2 } = this.props.data
    console.log('Combo props!', this.props.data.color1)
    return (
      <div className="combo-wrapper">
        <p className="combo-alias">a combo</p>
        <div className="combo-colors-wrapper">
          <div
            style={{ 'background-color': `${color1}` }}
            className="color-combo"
            value={color1}
          ></div>
          <div
            style={{ 'background-color': `${color2}` }}
            className="color-combo"
            value={color2}
          ></div>
        </div>
      </div>
    )
  }
}
