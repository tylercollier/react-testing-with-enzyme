import React, { Component, PropTypes } from 'react'
import QuoteCollection from './QuoteCollection'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Here are the most recent quotes</p>
        <QuoteCollection quotes={this.props.quotes}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  quotes: PropTypes.array
}

export default Dashboard
