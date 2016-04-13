import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import Dashboard from '../../../app/components/Dashboard'
import QuoteCollection from '../../../app/components/QuoteCollection'
import TestUtils from 'react-addons-test-utils'
import _quotes from '../../../fixtures/quotes'

chai.use(chaiEnzyme())

describe('Dashboard', () => {
  context("with Facebook's test utils", () => {
    it('renders a full section of DOM', () => {
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes}/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
    })
  })
})
