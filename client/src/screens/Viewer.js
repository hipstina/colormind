import React, { Component } from 'react'
import '../styles/screens/Viewer.css'
import Checker from '../components/Checker'
import Preview from '../components/Preview'

export default class Picker extends Component {
  constructor() {
    super()

    this.state = {
      checkerSelected: true
    }
  }

  render() {
    return (
      <div className="viewer-layout">
        {this.props.view === '0' ? <Checker /> : <Preview />}
      </div>
    )
  }
}
