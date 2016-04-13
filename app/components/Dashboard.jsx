import React, { Component, PropTypes } from 'react'
import QuoteCollection from './QuoteCollection'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Here are the most recent quotes</p>
        <p><a ref='createQuoteLink' onClick={this.props.onCreateLink}>Create a new quote</a></p>
        <QuoteCollection quotes={this.props.quotes}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  quotes: PropTypes.array,
  onCreateLink: PropTypes.func
}

export default Dashboard
