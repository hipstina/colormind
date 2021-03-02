import React, { Component } from 'react'
import '../styles/screens/Home.css'
import Picker from './Picker'
import Viewer from './Viewer'

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      pick: '1',
      view: '0'
    }
  }

  // handleClick = ({ target }) => {
  //   const attr = target.attributes[0]
  //   this.setState({
  //     [attr.name]: attr.value
  //   })

  //   attr.name === 'pick'
  //     ? this.props.history.push(`/pick=${attr.value}&view=${this.state.view}`)
  //     : this.props.history.push(`/pick=${this.state.pick}&view=${attr.value}`)
  // }

  handleClick = ({ target }) => {
    const attr = target.attributes[0]
    this.setState({
      [attr.name]: attr.value
    })
  }

  render() {
    return (
      <div className="home-layout-wrapper">
        <div className="sub-nav-wrapper">
          <ul>
            <button onClick={this.handleClick} pick="0">
              Collection
            </button>

            <button onClick={this.handleClick} pick="1">
              Custom
            </button>
          </ul>
          <ul>
            <button onClick={this.handleClick} view="0">
              Checker
            </button>

            <button onClick={this.handleClick} view="1">
              Preview
            </button>
          </ul>
        </div>

        <section className="home-layout">
          <Picker pick={this.state.pick} />
          <Viewer view={this.state.view} />
        </section>
      </div>
    )
  }
}
