import React, { Component } from 'react'
import '../styles/components/Custom.css'

export default class Custom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: this.props.selectedCombo.color1,
      color2: this.props.selectedCombo.color2,
      save: false,
      ratio: this.props.contrast.ratio,
      score: this.props.contrast.score,
      alias: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const newCombo = {
      color1: this.state.color1,
      color2: this.state.color2
    }
    this.props.setCombo(newCombo)
  }

  handleSave = (e) => {
    console.log('SAVE ME', e.target)
    this.setState((prevState) => ({
      save: !prevState.save
    }))
  }

  handleAdd = (e) => {
    e.preventDefault()

    if (e.target.name === 'id') {
      const alias = e.target.attributes.alias.value

      return this.props.updateCollection({
        id: e.target.value,
        alias: alias
      })
    } else {
      return this.props.createCollection({
        alias: this.state.alias
      })
    }
  }

  renderCollectionList = () => {
    console.log(this.props, this.state)
    // onClick, populate list of existing collection names as radio btns

    return this.props.collections.map((collection) => {
      return (
        <div key={collection._id}>
          <button
            name="id"
            alias={collection.alias}
            id={collection._id}
            value={collection._id}
            onClick={this.handleAdd}
            className="btn"
          >
            Add
          </button>
          <p>{collection.alias}</p>
        </div>
      )
    })
  }

  renderAddCollection = () => {
    return (
      <form onSubmit={this.handleAdd}>
        <input
          type="text"
          name="alias"
          id="custom-collection"
          placeholder="Crouton aftershave"
          value={this.state.alias}
          onChange={this.handleChange}
        />
        <button type="submit" value="Add" className="btn">
          Add
        </button>
      </form>
    )
  }

  render() {
    return (
      <div
        className="checker-wrapper"
        style={{
          borderColor: `${this.state.color1}`,
          color: `${this.state.color2}`
        }}
      >
        <div className="custom-color-warpper">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="color"
                placeholder="#66ee4f"
                name="color1"
                value={this.state.color1}
                onChange={this.handleChange}
                className="colorBox"
              />
              <input
                type="color"
                placeholder="#fb396b"
                name="color2"
                value={this.state.color2}
                onChange={this.handleChange}
                className="colorBox"
              />
            </div>
            <button className="btn">Preview</button>
          </form>
          <details
            className="custom-btn"
            onClick={this.handleSave}
            open={false}
          >
            <summary>Save to Collection</summary>
          </details>
          {this.state.save && (
            <div>
              <h4>Pick a collection </h4>

              <div className="collection-list">
                {this.renderCollectionList()}
              </div>

              <h4>... or create a collection</h4>
              <div className="collection-list">
                {this.renderAddCollection()}
              </div>
            </div>
          )}
        </div>
        <div className="">
          <h2>Contrast Score</h2>
          <div>
            <div>
              <h1 className="checker-score">{this.state.score}</h1>
              <h3 className="checker-ratio">{this.state.ratio}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
