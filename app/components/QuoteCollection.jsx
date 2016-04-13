import React, { Component, PropTypes } from 'react'
import Quote from './Quote'

class QuoteCollection extends Component {
  render() {
    return (
      <div>
      {
        this.props.quotes.map(quote => {
          return <Quote key={quote.id} quote={quote}/>
        })
      }
      </div>
    )
  }
}

QuoteCollection.propTypes = {
  quotes: PropTypes.array
}

export default QuoteCollection
