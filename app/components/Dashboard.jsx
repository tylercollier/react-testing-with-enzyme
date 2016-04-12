import React, { Component, PropTypes } from 'react'
import QuoteList from './QuoteList'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Here are the most recent quotes</p>
        <QuoteList/>
      </div>
    )
  }
}

export default Dashboard
