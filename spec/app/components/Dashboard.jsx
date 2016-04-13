import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import Dashboard from '../../../app/components/Dashboard'
import TestUtils from 'react-addons-test-utils'
import _quotes from '../../../fixtures/quotes'
import sinon from 'sinon'

chai.use(chaiEnzyme())

describe('Dashboard', () => {
  context("with Facebook's test utils", () => {
    it("handles clicking 'Create new quote' button", () => {
      const handleCreateLink = sinon.spy()
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes} onCreateLink={handleCreateLink}/>)
      TestUtils.Simulate.click(dashboard.refs.createQuoteLink)
      expect(handleCreateLink).to.have.been.called
    })
  })
})
