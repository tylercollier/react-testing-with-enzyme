import React, { Component, PropTypes } from 'react'
import PhraseCollection from './PhraseCollection'

class Quote extends Component {
  render() {
    return <PhraseCollection phrases={this.props.quote.phrases}/>
  }
}

Quote.propTypes = {
  quote: PropTypes.object
}

export default Quote
