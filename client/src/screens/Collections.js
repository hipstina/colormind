import React, { Component } from 'react'
import Collection from '../components/Collection'
import '../styles/screens/Collections.css'

export default class Collections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data
    }
  }

  render() {
    const cols = this.state.data
    console.log('Collections props', this.props)
    return (
      <div>
        <h1>Collections</h1>
        {cols.map((col) => {
          let props = { ...this.props, collection: col }
          return (
            <Collection
              key={col._id}
              {...props}
              onClick={() => this.props.history.push(`/collection/${col._id}`)}
            />
          )
        })}
      </div>
    )
  }
}
