import { expect } from 'chai'
import Dashboard from '../../../app/components/Dashboard'
import React from 'react'
import { shallow } from 'enzyme'

describe(Dashboard, () => {
  it('outputs the text hi', () => {
    expect(shallow(<Dashboard/>).text()).to.equal("hi")
  })
})