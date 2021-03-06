import React, { Component } from 'react'
import Collection from '../components/Collection'
import '../styles/screens/Collections.css'

export default class Collections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      selectedCombo: props.selectedCombo
    }
  }

  componentDidMount() {
    this.setState({ data: this.props.data.reverse() })
  }

  render() {
    const cols = this.state.data
    return (
      <div className="collections-wrapper">
        <div className="collections-title">
          <h2>Collections</h2>
          <p>Click on a collection to view all combos.</p>
        </div>
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
