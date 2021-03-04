import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/components/Nav.css'

export default class NavRight extends Component {
  render() {
    const nav = this.props.nav

    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/custom">Custom</NavLink>
        <NavLink to="/collections">Collections</NavLink>
      </nav>
    )
  }
}
