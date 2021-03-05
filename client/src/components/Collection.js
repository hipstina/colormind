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

  // state will depend on which component the router is wrapped around
  componentDidMount() {
    console.log(this.props)
    if (this.state.collectionId) {
      this.getOneCollection()
    } else this.setState({ setCombo: this.props.setCombo })
    console.log('collection component mounted!')
  }

  getOneCollection = async () => {
    try {
      let collection = await axios.get(
        `${BASE_URL}/api/view/collection/${this.state.collectionId}`
      )
      this.setState({ collection: collection.data.collection })
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = (event) => {
    event.preventDefault()
    const newCombo = {
      contrast_ratio: '3',
      w3_grade: 'AA',
      color1: event.target.attributes.color1.value,
      color2: event.target.attributes.color2.value
    }
    this.props.setCombo(newCombo)
  }

  handleDelete = (event) => {
    this.props.deleteCollection(event.target.value)
  }

  render() {
    const { alias } = this.state.collection

    const collectionId = this.state.collectionId

    const renderCombosPreview = () => {
      return this.props.collection.combos.map((combo, idx) => {
        return idx <= 2 ? (
          <Combo
            key={combo._id + `${idx}`}
            {...combo}
            collectionId={collectionId}
            onClick={() => this.props.history.push(`/collection/${combo._id}`)}
          />
        ) : null
      })
    }

    const renderCombosPage = () => {
      let comboData = this.state.collection
      if (comboData)
        return comboData.combos.map((combo, idx) => {
          return (
            <div key={combo._id + `${idx}`}>
              <Combo {...combo} />
              <NavLink to="/checker">
                <button
                  onClick={this.handleClick}
                  color1={combo.color1}
                  color2={combo.color2}
                >
                  Preview
                </button>
              </NavLink>
            </div>
          )
        })
    }

    const renderDeleteBtn = () => {
      let comboData = this.state.collection
      if (comboData)
        return (
          <NavLink
            to="/collections"
            onClick={this.handleDelete}
            value={collectionId}
          >
            <button>Delete this collection</button>
          </NavLink>
        )
    }

    return (
      <div onClick={this.props.onClick}>
        <h2>Collection Name: {alias}</h2>
        <div className="color-combo-wrapper">
          {this.props.collection && renderCombosPreview()}
          {collectionId && renderCombosPage()}
        </div>
        {collectionId && renderDeleteBtn()}
      </div>
    )
  }
}
