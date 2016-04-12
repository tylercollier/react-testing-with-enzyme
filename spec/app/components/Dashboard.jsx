import { expect } from 'chai'
import Dashboard from '../../../app/components/Dashboard'
import React from 'react'
import { shallow, mount } from 'enzyme'
import QuoteList from '../../../app/components/QuoteList'

describe(Dashboard, () => {
  it('outputs the text hi', () => {
    expect(shallow(<Dashboard/>).text()).to.contain("Here are the most recent quotes")
  })
  it('renders HTML', () => {
    expect(shallow(<Dashboard/>).contains(<p>Here are the most recent quotes</p>)).to.equal(true)
  })
  it('mounts and can find an internal component', () => {
    expect(mount(<Dashboard/>).find(QuoteList).length).to.equal(1)
  })
})
