import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/components/Nav.css'

export default class NavRight extends Component {
  render() {
    return (
      <nav>
        <NavLink to="/" className="logo">
          colormind
        </NavLink>
        <NavLink to="/checker">Contrast Checker</NavLink>
        <NavLink to="/collections">Collections</NavLink>
      </nav>
    )
  }
}
