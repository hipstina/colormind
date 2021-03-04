import React, { Component } from 'react'
import Combo from './Combo'
import '../styles/components/Collection.css'

import axios from 'axios'
import { BASE_URL } from '../globals'

export default class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      combos: []
    }
  }

  componentDidMount() {
    this.getAllCombos()
  }

  getAllCombos = () => {
    this.state.data.map(async (id) => {
      console.log(id)
      try {
        let combo = await axios.get(`${BASE_URL}/api/find/combo/${id}`)
        console.log(combo)
        this.setState((prevState) => ({
          combos: [combo, ...prevState.combos]
        }))
      } catch (error) {
        console.log(error)
      }
    })
  }

  deleteCombo = async (comboId) => {
    // const comboId = event.target.attributes.postId.value

    try {
      const res = await axios.delete(`${BASE_URL}/api/delete/combo/${comboId}`)
      console.log(res.data)
      const res2 = await axios.get(`${BASE_URL}/api/allposts`)
      this.setState({
        allPosts: res2.data.posts
      })
      return res2.data
    } catch (error) {
      throw error
    }
  }

  render() {
    console.log('COLLECTION STATE', this.state.data, this.state.combos)
    const combos = this.state.combos
    const { onClick } = this.props
    return (
      <div>
        <h1>Collection</h1>
        <div className="color-combo-wrapper">
          {combos.map((combo) => {
            console.log('COMBO PROPS', combo)
            return (
              <Combo
                key={combo.data.combo._id}
                data={combo.data.combo}
                comboId={combo.data.combo._id}
                onClick={this.deleteCombo}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
