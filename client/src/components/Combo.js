import React, { Component } from 'react'
import '../styles/components/Combo.css'

export default class Combo extends Component {
  render() {
    const { color1, color2 } = this.props

    return (
      <div className="combo-wrapper">
        <div className="combo-colors-wrapper">
          <div
            style={{ backgroundColor: `${color1}` }}
            className="color-combo"
            value={color1}
          >
            <span
              style={{
                color: `${color2}`,
                fontSize: '2.5rem',
                fontWeight: 'bolder'
              }}
            >
              A
            </span>
          </div>
          <div
            style={{ backgroundColor: `${color2}` }}
            className="color-combo"
            value={color2}
          >
            <span
              style={{
                color: `${color1}`,
                fontSize: '2.5rem',
                fontWeight: 'bolder'
              }}
            >
              a
            </span>
          </div>
        </div>
      </div>
    )
  }
}
