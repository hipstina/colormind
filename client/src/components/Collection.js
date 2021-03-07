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
      collection: props.collection || '',
      selectedCombo: props.selectedCombo
    }
  }

  // state will depend on which component the router is wrapped around
  componentDidMount() {
    console.log(this.props)
    if (this.state.collectionId) {
      this.getOneCollection()
    }
    // else this.setState({ setCombo: this.props.setCombo })
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
            selectedCombo={this.state.selectedCombo}
            onClick={() => this.props.history.push(`/collection/${combo._id}`)}
          />
        ) : null
      })
    }

    const renderCombosPage = () => {
      const styles = {
        btn: {
          borderColor: `${this.props.selectedCombo.color2} `,
          background: `${this.props.selectedCombo.color1} `,
          color: `${this.props.selectedCombo.color2}`
        }
      }

      let comboData = this.state.collection

      if (comboData)
        return comboData.combos.reverse().map((combo, idx) => {
          return (
            <div key={combo._id + `${idx}`}>
              <Combo {...combo} selectedCombo={this.state.selectedCombo} />
              <NavLink to="/checker">
                <button
                  onClick={this.handleClick}
                  color1={combo.color1}
                  color2={combo.color2}
                  className="btn"
                  style={styles.btn}
                >
                  Preview
                </button>
              </NavLink>
            </div>
          )
        })
    }

    const renderDeleteBtn = () => {
      const styles = {
        deleteBtn: {
          borderColor: `${this.props.selectedCombo.color2} `,
          background: `${this.props.selectedCombo.color2} `,
          color: `${this.props.selectedCombo.color1}`
        }
      }
      let comboData = this.state.collection
      if (comboData)
        return (
          <button
            className="btn delete-btn"
            onClick={this.handleDelete}
            value={comboData._id}
            style={styles.deleteBtn}
          >
            Delete this collection
          </button>
        )
    }

    const styles = {
      btn: {
        borderBottomColor: `${this.props.selectedCombo.color2} `,
        background: `${this.props.selectedCombo.color2} `,
        borderColor: `${this.props.selectedCombo.color2} `,
        color: `${this.props.selectedCombo.color2}`
      },

      collectionsName: {
        borderBottomColor: `${this.props.selectedCombo.color2} `
      }
    }

    return (
      <div onClick={this.props.onClick} className="collection-wrapper">
        <h3 className="collections-name">{alias}</h3>

        <div>
          <hr
            className="collection-divider"
            style={styles.collectionsName}
          ></hr>
          <div className="color-combo-wrapper">
            {this.props.collection && renderCombosPreview()}
          </div>
          <div className="combo-wrapper">
            {collectionId && renderCombosPage()}
          </div>
          <div>{collectionId && renderDeleteBtn()}</div>
        </div>
      </div>
    )
  }
}
