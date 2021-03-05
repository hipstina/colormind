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
    }
    // else this.setState({ setCombo: this.props.setCombo })
    // console.log('collection component mounted!')
  }

  getOneCollection = async () => {
    try {
      let collection = await axios.get(
        `${BASE_URL}/api/view/collection/${this.state.collectionId}`
      )
      if (collection) {
        this.setState({ collection: collection.data.collection })
        return collection
      } else {
        this.props.history.push('/collections')
      }
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

  handleDelete = async (event) => {
    event.preventDefault()
    console.log(event.target.value)

    try {
      await this.props.deleteCollection(event.target.value)
      this.props.history.push('/collections')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { alias } = this.state.collection

    const collectionId = this.state.collectionId

    const renderCombosPreview = () => {
      const combos = this.props.collection.combos
      return combos.map((combo, idx) => {
        return idx >= combos.length - 3 ? (
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
        return comboData.combos.reverse().map((combo, idx) => {
          return (
            <div key={combo._id + `${idx}`}>
              <Combo {...combo} />
              <NavLink to="/checker">
                <button
                  onClick={this.handleClick}
                  color1={combo.color1}
                  color2={combo.color2}
                  className="btn"
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
      // console.log('comboData', comboData._id)
      if (comboData)
        return (
          <button
            className="btn"
            onClick={this.handleDelete}
            value={comboData._id}
          >
            Delete this collection
          </button>
        )
    }

    return (
      <div onClick={this.props.onClick} className="collection-wrapper">
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
