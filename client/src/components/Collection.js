import React, { Component } from 'react'
import Combo from './Combo'
import '../styles/components/Collection.css'
import { NavLink } from 'react-router-dom'

import axios from 'axios'
import { BASE_URL } from '../globals'

export default class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props,
      collectionId: props.match.params.id,
      collection: props.collection || ''
    }
  }

  componentDidMount() {
    console.log(this.props)
    if (this.state.collectionId) {
      this.getOneCollection()
    }

    console.log('collection component mounted!')
  }

  getOneCollection = async () => {
    try {
      let collection = await axios.get(
        `${BASE_URL}/api/view/collection/${this.state.collectionId}`
      )
      console.log(collection)
      this.setState({ collection: collection.data.collection })
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { alias } = this.state.collection
    console.log('PLAN B', this.state.collectionId)

    const collectionId = this.state.collectionId

    const renderCombosPreview = () => {
      return this.props.collection.combos.map((combo, idx) => {
        return idx <= 2 ? (
          <Combo
            key={combo._id}
            {...combo}
            collectionId={collectionId}
            onClick={() => this.props.history.push(`/collection/${combo._id}`)}
          />
        ) : null
      })
    }

    const renderCombosPage = () => {
      console.log('PLAN BB:', collectionId, this.state.collection)
      let comboData = this.state.collection
      if (comboData)
        return comboData.combos.map((combo) => {
          return (
            <div>
              <Combo key={combo._id} {...combo} />
              <NavLink to="/checker">
                <button>Preview</button>
              </NavLink>
            </div>
          )
        })
    }

    const renderDeleteBtn = () => {
      let comboData = this.state.collection
      if (comboData)
        return (
          <NavLink to="/collections">
            <button>Delete this collection</button>
          </NavLink>
        )
    }

    return (
      <div onClick={this.props.onClick}>
        <h1>Collection Name: {alias}</h1>
        <div className="color-combo-wrapper">
          {this.props.collection && renderCombosPreview()}
          {collectionId && renderCombosPage()}
        </div>
        {collectionId && renderDeleteBtn()}
      </div>
    )
  }
}
