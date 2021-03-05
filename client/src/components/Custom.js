import React, { Component } from 'react'
// import contrast from 'get-contrast'
// import randomcolor from 'randomcolor'

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

  componentDidMount() {}

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
    // this.props.calcContrast()
  }

  handleSave = (e) => {
    console.log('SAVE ME', e.target)
    this.setState((prevState) => ({
      save: !prevState.save
    }))
  }

  handleAdd = (e) => {
    e.preventDefault()

    // console.log('HANDLE ADD', e.target.name, this.state.alias)
    // console.log(e.target.value, e.target.name)
    // console.log(e.target.attributes.alias.value)
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
    // invoke updateCollection(collectionId)
    return this.props.collections.map((collection) => {
      return (
        <div key={collection._id}>
          <button
            name="id"
            alias={collection.alias}
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
        <input
          type="text"
          name="alias"
          id="custom-collection"
          placeholder="Crouton aftershave"
          value={this.state.alias}
          onChange={this.handleChange}
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
          <div>
            <div>
              <h1>{this.state.score}</h1>
              <h2>{this.state.ratio}</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
