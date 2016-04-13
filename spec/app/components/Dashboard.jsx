import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import Dashboard from '../../../app/components/Dashboard'
import QuoteCollection from '../../../app/components/QuoteCollection'
import Quote from '../../../app/components/Quote'
import PhraseCollection from '../../../app/components/PhraseCollection'
import Phrase from '../../../app/components/Phrase'
import TestUtils from 'react-addons-test-utils'
import _quotes from '../../../fixtures/quotes'
import { shallow, mount } from 'enzyme'

chai.use(chaiEnzyme())

describe(Dashboard, () => {
  context("with enzyme", () => {
    it('renders a full section of DOM', () => {
      const dashboard = mount(<Dashboard quotes={_quotes}/>)
      const quoteCollection = dashboard.find(QuoteCollection)
      expect(quoteCollection).to.have.length.of(1)
      const quotes = quoteCollection.at(0).find(Quote)
      expect(quotes).to.have.length.of(3)
      const phraseCollection = quotes.at(2).find(PhraseCollection)
      expect(phraseCollection).to.have.length.of(1)
      const phrases = phraseCollection.at(0).find(Phrase)
      expect(phrases).to.have.length.of(2)
      expect(phrases.at(0).props().phrase.text).to.equal("Everyone has an irrational fear")
    })
  })
})
