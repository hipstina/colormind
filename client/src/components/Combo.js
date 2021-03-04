import React, { Component } from 'react'
import '../styles/components/Combo.css'

import axios from 'axios'
import { BASE_URL } from '../globals'
export default class Combo extends Component {
  // componentDidMount() {
  //   console.log(this.props)
  //   if (this.state.collectionId) {
  //     this.getOneCollection()
  //   }

  //   console.log('combo component mounted!')
  // }

  // getOneCollection = async () => {
  //   try {
  //     let collection = await axios.get(
  //       `${BASE_URL}/api/view/collection/${this.state.collectionId}`
  //     )
  //     console.log(collection)
  //     this.setState({ collection: collection.data.collection })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  render() {
    console.log('COMBO props')
    console.log('COMBO props', this.props)
    const { color1, color2, contrast_ratio, w3_grade } = this.props

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
