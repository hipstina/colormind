import React, { Component } from 'react'
import '../styles/screens/Picker.css'
import Custom from '../components/Custom'
import Collection from '../components/Collection'

export default class Picker extends Component {
  render() {
    // console.log('Picker props', this.props)
    const {
      publishBtn,
      selectedCombo,
      handleClick,
      setCombo,
      onClick
    } = this.props

    return (
      <div className="picker-layout">
        {this.props.pick === '0' ? (
          <Collection data={this.props.data} onClick={onClick} />
        ) : (
          <Custom
            handleClick={handleClick}
            publishBtn={publishBtn}
            selectedCombo={selectedCombo}
            setCombo={setCombo}
          />
        )}
      </div>
    )
  }
}
