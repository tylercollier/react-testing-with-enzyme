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
    it('renders a full section of DOM', () => {
      const dashboard = TestUtils.renderIntoDocument(<Dashboard quotes={_quotes}/>)
      const quoteCollection = TestUtils.scryRenderedComponentsWithType(dashboard, QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
      const quotes = TestUtils.scryRenderedComponentsWithType(quoteCollection[0], Quote)
      expect(quotes).to.have.length.of(3)
      const phraseCollection = TestUtils.scryRenderedComponentsWithType(quotes[2], PhraseCollection)
      expect(phraseCollection).to.have.length.of(1)
      const phrases = TestUtils.scryRenderedComponentsWithType(phraseCollection[0], Phrase)
      expect(phrases).to.have.length.of(2)
      expect(phrases[0].props.phrase.text).to.equal("Everyone has an irrational fear")
    })
  })
})
