import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/components/Nav.css'

export default class NavRight extends Component {
  render() {
    const nav = this.props.nav
    console.log('this.props', this.props.nav)

    // const renderNav = () => {
    //   switch (true) {
    //     case nav.custom && nav.checker:
    //       return (
    //         <nav>
    //           <NavLink to="/collection/checker">collection Checker</NavLink>
    //           <NavLink to="/custom/preview">collection Preview</NavLink>
    //         </nav>
    //       )

    //     case nav.custom && nav.preview:
    //       return (
    //         <nav>
    //           <NavLink to="/collection/checker">collection Checker</NavLink>
    //           <NavLink to="/collection/preview">collection Preview</NavLink>
    //         </nav>
    //       )
    //     case nav.collection && nav.checker:
    //       return (
    //         <nav>
    //           <NavLink to="/custom/checker">collection Checker</NavLink>
    //           <NavLink to="/collection/preview">collection Preview</NavLink>
    //         </nav>
    //       )
    //     case nav.collection && nav.preview:
    //       return (
    //         <nav>
    //           <NavLink to="/custom/checker">collection Checker</NavLink>
    //           <NavLink to="/custom/preview">collection Preview</NavLink>
    //         </nav>
    //       )
    //     default:
    //       return (
    //         <nav>
    //           <NavLink to="/collection/checker">collection Checker</NavLink>
    //           <NavLink to="/custom/preview">collection Preview</NavLink>
    //         </nav>
    //       )
    //   }
    // }
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    )
  }
}
