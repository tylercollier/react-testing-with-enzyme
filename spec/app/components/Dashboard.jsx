import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import Dashboard from '../../../app/components/Dashboard'
import QuoteCollection from '../../../app/components/QuoteCollection'
import Quote from '../../../app/components/Quote'
import PhraseCollection from '../../../app/components/PhraseCollection'
import Phrase from '../../../app/components/Phrase'
import TestUtils from 'react-addons-test-utils'
import _quotes from '../../../fixtures/quotes'
import sinon from 'sinon'

chai.use(chaiEnzyme())

describe('Dashboard', () => {
  context("with Facebook's test utils", () => {
    it("handles clicking 'Like'", () => {
      const handleLikeQuote = sinon.spy()
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes} onLikeQuote={handleLikeQuote}/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
      const quotes = TestUtils.scryRenderedComponentsWithType(quoteCollection[0], Quote)
      expect(quotes).to.have.length.of(3)
      const quote = quotes[2]
      TestUtils.Simulate.click(quote.refs.likeLink)
      expect(handleLikeQuote).to.have.been.called
    })
  })
})
