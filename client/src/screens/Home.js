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
          <p>
            Color is used to bring additional context and nuance to a design. As
            designers and developers of web applications, we frequently use
            color to convey or enhance the content’s meaning. However, too often
            we use color inefficiently, obscuring our content's meaning.
            Colormind makes finding high contrast colors easy.
          </p>
        </section>
      </div>
    )
  }
}
