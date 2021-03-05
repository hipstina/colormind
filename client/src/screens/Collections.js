import React, { Component } from 'react'
import Collection from '../components/Collection'
import '../styles/screens/Collections.css'

export default class Collections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({ data: this.props.data.reverse() })
  }

  render() {
    const cols = this.state.data
    return (
      <div className="collections-wrapper">
        <h1>Collections</h1>
        {cols.map((col, idx) => {
          let props = {
            ...this.props,
            collection: col
          }
          return (
            <Collection
              {...props}
              key={col._id + `${idx}`}
              onClick={() => this.props.history.push(`/collection/${col._id}`)}
            />
          )
        })}
      </div>
    )
  }
}
