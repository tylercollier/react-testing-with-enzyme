import React, { Component, PropTypes } from 'react'
import Phrase from './Phrase'

class PhraseCollection extends Component {
  render() {
    return (
      <div>
      {
        this.props.phrases.map(phrase => {
          return <Phrase key={phrase.id} phrase={phrase}/>
        })
      }
      </div>
    )
  }
}

PhraseCollection.propTypes = {
  phrases: PropTypes.array
}

export default PhraseCollection
