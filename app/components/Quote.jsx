import React, { Component, PropTypes } from 'react'
import PhraseCollection from './PhraseCollection'

class Quote extends Component {
  render() {
    return (
      <div>
        <PhraseCollection phrases={this.props.quote.phrases}/>
        <a ref="likeLink" onClick={this.props.onLike}>Like</a>
      </div>
    )
  }
}

Quote.propTypes = {
  quote: PropTypes.object,
  onLike: PropTypes.func
}

export default Quote
