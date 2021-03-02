import React, { Component } from 'react'
import '../styles/screens/Picker.css'
import Custom from '../components/Custom'
import Collection from '../components/Collection'

export default class Picker extends Component {
  render() {
    return (
      <div className="picker-layout">
        {this.props.pick === '0' ? <Custom /> : <Collection />}
      </div>
    )
  }
}
