import React, { Component } from 'react'

export default class Custom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: this.props.selectedCombo.color1,
      color2: this.props.selectedCombo.color2,
      save: false,
      newCollectionInput: ''
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
      contrast_ratio: '3',
      w3_grade: 'AA',
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
    const collection = {
      [e.target.name]: e.target.value
    }

    console.log('HANDLE ADD', e.target)
    if (e.target.name === 'id')
      return this.props.updateCollection({
        [e.target.name]: e.target.value
      })

    if (e.target.name === 'alias')
      return this.props.createCollection({ [e.target.name]: e.target[0].value })
  }

  renderCollectionList = () => {
    console.log(this.props, this.state)
    // onClick, populate list of existing collection names as radio btns
    // invoke updateCollection(collectionId)
    return this.props.collections.map((collection) => {
      return (
        <div key={collection._id}>
          <button
            name="id"
            id={collection._id}
            value={collection._id}
            onClick={this.handleAdd}
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
        <label htmlFor="custom-collection"> </label>
        <input
          type="text"
          name="alias"
          id="custom-collection"
          placeholder="Crouton aftershave"
        />
        <input type="submit" value="Add" />
      </form>
    )
  }

  render() {
    // console.log('Custom props!', this.props)
    return (
      <div>
        <h1>Custom</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="color"
            placeholder="#66ee4f"
            name="color1"
            value={this.state.color1}
            onChange={this.handleChange}
          />
          <input
            type="color"
            placeholder="#fb396b"
            name="color2"
            value={this.state.color2}
            onChange={this.handleChange}
          />
          <button>Preview</button>
        </form>
        <details className="custom-btn" onClick={this.handleSave} open={false}>
          <summary>Save to Collection</summary>
        </details>
        {this.state.save && (
          <div>
            <h4>Pick a collection </h4>

            <div className="collection-list">{this.renderCollectionList()}</div>

            <h4>... or create a collection</h4>
            <div className="collection-list">{this.renderAddCollection()}</div>
          </div>
        )}
        <div className="">
          <h1>Color Checker</h1>
        </div>
      </div>
    )
  }
}
