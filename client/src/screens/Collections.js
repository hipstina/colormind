import React, { Component } from 'react'
import Collection from '../components/Collection'
import '../styles/screens/Collections.css'

export default class Collections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
      // setCombo: props.setCombo
    }
  }

  componentDidMount() {
    this.setState({ data: this.props.data.reverse() })
  }

  render() {
    const cols = this.state.data
    // console.log('Collections props', this.props)
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
              // collection={col}
              // deleteCollection={this.deleteCollection}
              key={col._id + `${idx}`}
              // {...this.props}
              onClick={() => this.props.history.push(`/collection/${col._id}`)}
            />
          )
        })}
      </div>
    )
  }
}
