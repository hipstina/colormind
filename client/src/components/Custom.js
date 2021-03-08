import React, { Component } from 'react'
import '../styles/components/Custom.css'

export default class Custom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: this.props.selectedCombo.color1,
      color2: this.props.selectedCombo.color2,

      ratio: this.props.contrast.ratio,
      score: this.props.contrast.score,
      alias: '',
      selectedCombo: this.props.selectedCombo
    }
  }

  handleChange = ({ target }) => {
    if (target.name === 'alias') {
      this.setState(() => ({
        [target.name]: target.value
      }))
    } else if (target.name !== 'alias')
      this.setState(() => ({
        [target.name]: target.value,
        ratio: '',
        score: ''
      }))
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const newCombo = {
      color1: this.state.color1,
      color2: this.state.color2
    }
    await this.props.setCombo(newCombo)
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
    const styles = {
      btn: {
        borderColor: `${this.state.selectedCombo.color2} `,
        background: `${this.state.selectedCombo.color1} `,
        color: `${this.state.selectedCombo.color2}`
      }
    }
    // onClick, populate list of existing collection names as radio btns

    return this.props.collections.map((collection) => {
      return (
        <div key={collection._id} className="collection-item-wrapper">
          <p>{collection.alias}</p>
          <button
            name="id"
            alias={collection.alias}
            id={collection._id}
            value={collection._id}
            onClick={this.handleAdd}
            className="btn"
            style={styles.btn}
          >
            Add
          </button>
        </div>
      )
    })
  }

  renderAddCollection = () => {
    const styles = {
      btn: {
        borderColor: `${this.state.selectedCombo.color2} `,
        background: `${this.state.selectedCombo.color1} `,
        color: `${this.state.selectedCombo.color2}`
      },
      input: {
        borderColor: `${this.state.selectedCombo.color2}`,
        color: `${this.state.selectedCombo.color2}`,
        letterSpacing: `.05rem`
      }
    }
    return (
      <form onSubmit={this.handleAdd}>
        <input
          type="text"
          name="alias"
          id="custom-collection"
          placeholder="Crouton aftershave"
          value={this.state.alias}
          onChange={this.handleChange}
          className="add-collection-input border-color"
          style={styles.input}
        />
        <button type="submit" value="Add" className="btn" style={styles.btn}>
          Add
        </button>
      </form>
    )
  }

  renderSaveOptions = () => {
    return (
      <div>
        <details className="custom-btn" open={false}>
          <summary>Save</summary>

          <div className="save-to-collection-wrapper">
            <div className="pick-collection-wrapper">
              <h4 className="collection-form-label">Pick a collection </h4>
              <div className="collection-list">
                {this.renderCollectionList()}
              </div>
            </div>

            <div className="add-collection-wrapper">
              <h4 className="collection-form-label">Create a new collection</h4>
              <div className="collection-list">
                {this.renderAddCollection()}
              </div>
            </div>
          </div>
        </details>
      </div>
    )
  }

  render() {
    const styles = {
      btn: {
        borderColor: `${this.state.selectedCombo.color2} `,
        backgroundColor: `${this.state.selectedCombo.color1} `,
        color: `${this.state.selectedCombo.color2}`
      },
      colorBox: {
        borderColor: `${this.state.selectedCombo.color2} `,
        backgroundColor: `${this.state.selectedCombo.color2} `
      }
    }
    return (
      <div className="checker-wrapper">
        <div className="custom-color-wrapper">
          <form
            onClick={() => this.setState({ submitted: true })}
            onSubmit={this.handleSubmit}
          >
            <div>
              <input
                type="color"
                placeholder="#66ee4f"
                name="color1"
                value={this.state.color1}
                onChange={this.handleChange}
                className="colorBox"
                style={styles.colorBox}
              />
              <input
                type="color"
                placeholder="#fb396b"
                name="color2"
                value={this.state.color2}
                onChange={this.handleChange}
                className="colorBox"
                style={styles.colorBox}
              />
            </div>
            <button className="btn" style={styles.btn}>
              Preview
            </button>
          </form>
          {this.state.color1 === this.state.selectedCombo.color1 &&
          this.state.color2 === this.state.selectedCombo.color2
            ? this.renderSaveOptions()
            : null}
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
