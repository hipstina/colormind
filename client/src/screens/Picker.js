import React, { Component } from 'react'
import '../styles/screens/Picker.css'
import Custom from '../components/Custom'
import Collection from '../components/Collection'

export default class Picker extends Component {
  render() {
    console.log('Picker props', this.props)
    const {
      handleSubmit,
      publishBtn,
      selectedCombo,
      handleChange,
      color1,
      color2
    } = this.props

    return (
      <div className="picker-layout">
        {this.props.pick === '0' ? (
          <Collection data={this.props.data} />
        ) : (
          <Custom
            handleSubmit={handleSubmit}
            // handleChange={handleChange}
            publishBtn={publishBtn}
            selectedCombo={selectedCombo}
            color1={color1}
            color2={color2}
          />
        )}
      </div>
    )
  }
}
