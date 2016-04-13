import React, { Component, PropTypes } from 'react'

class Phrase extends Component {
  render() {
    const phrase = this.props.phrase
    return (
      <div>
        <strong>{phrase.name}</strong>: {phrase.text}
      </div>
    )
  }
}

Phrase.propTypes = {
  phrase: PropTypes.object
}

export default Phrase
