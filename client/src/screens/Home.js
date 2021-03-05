import React, { Component } from 'react'
import '../styles/screens/Home.css'
// import Picker from './Picker'
// import Viewer from './Viewer'

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      pick: '1',
      view: '0'
    }
  }

  handleClick = ({ target }) => {
    const attr = target.attributes[0]
    this.setState({
      [attr.name]: attr.value
    })
  }

  render() {
    return (
      <div className="home-layout-wrapper">
        <section className="home-layout">
          <h1>colormind</h1>
        </section>
      </div>
    )
  }
}
