import React, { Component, PropTypes } from 'react'
import Quote from './Quote'

class QuoteCollection extends Component {
  render() {
    return (
      <div>
      {
        this.props.quotes.map(quote => {
          return <Quote key={quote.id} quote={quote} onLike={this.props.onLikeQuote}/>
        })
      }
      </div>
    )
  }
}

QuoteCollection.propTypes = {
  quotes: PropTypes.array,
  onLikeQuote: PropTypes.func
}

export default QuoteCollection
